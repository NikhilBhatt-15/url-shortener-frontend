import React, { useState } from "react";
import "./App.css";

interface ShortenedUrl {
  shortUrl: string;
  longUrl: string;
  shortCode: string;
  clickCount: number;
  createdAt: string;
}

interface AnalyticsData {
  url: {
    shortUrl: string;
    longUrl: string;
    clickCount: number;
    createdAt: string;
    isActive: boolean;
  };
  recentClicks: Array<{
    ipAddress: string;
    userAgent: string;
    referrer: string;
    createdAt: string;
  }>;
}

function App() {
  const [shortUrlData, setShortUrlData] = useState<ShortenedUrl | null>(null);
  const [longUrl, setLongUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [showAnalytics, setShowAnalytics] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const BASE_URL =
    import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:2000";

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const shorten = async (longUrl: string) => {
    if (!longUrl.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!isValidUrl(longUrl)) {
      setError("Please enter a valid URL (include http:// or https://)");
      return;
    }

    setError("");
    setLoading(true);
    setShortUrlData(null);
    setAnalytics(null);
    setShowAnalytics(false);

    try {
      const response = await fetch(`${BASE_URL}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          longurl: longUrl,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setShortUrlData(data);
    } catch (err) {
      console.error("Error shortening URL:", err);
      setError("Failed to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getAnalytics = async (shortCode: string) => {
    try {
      const response = await fetch(`${BASE_URL}/analytics/${shortCode}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setAnalytics(data);
      setShowAnalytics(true);
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setError("Failed to fetch analytics");
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setError("Failed to copy to clipboard");
    }
  };

  const resetForm = () => {
    setLongUrl("");
    setShortUrlData(null);
    setError("");
    setAnalytics(null);
    setShowAnalytics(false);
    setCopied(false);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="heading">URL Shortener</h1>
        <p className="subtitle">
          Transform your long URLs into short, shareable links
        </p>

        <div className="form-section">
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your URL here (e.g., https://example.com)"
              value={longUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLongUrl(e.target.value);
                setError("");
              }}
              className="url-input"
              disabled={loading}
            />
            <button
              onClick={() => shorten(longUrl)}
              disabled={loading || !longUrl.trim()}
              className="shorten-btn"
            >
              {loading ? "Shortening..." : "Shorten URL"}
            </button>
          </div>

          {error && <div className="error-message">⚠️ {error}</div>}
        </div>

        {shortUrlData && (
          <div className="result-section">
            <h2>Your Shortened URL</h2>
            <div className="url-result">
              <div className="url-info">
                <p>
                  <strong>Original:</strong> {shortUrlData.longUrl}
                </p>
                <p>
                  <strong>Short URL:</strong>
                  <a
                    href={shortUrlData.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortUrlData.shortUrl}
                  </a>
                </p>
                <p>
                  <strong>Clicks:</strong> {shortUrlData.clickCount}
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(shortUrlData.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="action-buttons">
                <button
                  onClick={() => copyToClipboard(shortUrlData.shortUrl)}
                  className="copy-btn"
                >
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
                <button
                  onClick={() => getAnalytics(shortUrlData.shortCode)}
                  className="analytics-btn"
                >
                  📊 View Analytics
                </button>
                <button onClick={resetForm} className="new-btn">
                  ➕ Create New
                </button>
              </div>
            </div>
          </div>
        )}

        {showAnalytics && analytics && (
          <div className="analytics-section">
            <h2>Analytics for {analytics.url.shortUrl}</h2>
            <div className="analytics-stats">
              <div className="stat-card">
                <h3>Total Clicks</h3>
                <p className="stat-number">{analytics.url.clickCount}</p>
              </div>
              <div className="stat-card">
                <h3>Status</h3>
                <p
                  className={`status ${
                    analytics.url.isActive ? "active" : "inactive"
                  }`}
                >
                  {analytics.url.isActive ? "Active" : "Inactive"}
                </p>
              </div>
              <div className="stat-card">
                <h3>Created</h3>
                <p>{new Date(analytics.url.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {analytics.recentClicks.length > 0 && (
              <div className="recent-clicks">
                <h3>Recent Clicks</h3>
                <div className="clicks-list">
                  {analytics.recentClicks.slice(0, 10).map((click, index) => (
                    <div key={index} className="click-item">
                      <span className="click-time">
                        {new Date(click.createdAt).toLocaleString()}
                      </span>
                      <span className="click-ip">{click.ipAddress}</span>
                      {click.referrer && (
                        <span className="click-referrer">
                          from {new URL(click.referrer).hostname}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setShowAnalytics(false)}
              className="close-analytics-btn"
            >
              ✕ Close Analytics
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
