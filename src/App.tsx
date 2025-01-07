import { useState } from 'react';
import './App.css';

/// <reference types="node" />

function App() {
    const [shortUrl, setShortUrl] = useState<string>('');
    const [longUrl, setLongUrl] = useState<string>('');
    const [error, setError] = useState<string>('');
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    console.log(BASE_URL);

    const shorten = (longUrl: string) => {
        setError('');
        fetch(`${BASE_URL}/shorten`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "longurl": longUrl
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data.error) {
                setError(data.error);
                return;
            }
            setShortUrl(data.shorturl);
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <>
            <span className={"heading"}>Shorten Your Url</span>
            <div>
                <h1>Paste Your Url</h1>
                <input type="text" placeholder={"Paste Your Url"} onChange={(e) => {
                    setLongUrl(e.target.value);
                }} defaultValue={longUrl}></input>
                <button onClick={() => {
                    shorten(longUrl);
                }}>Shorten</button>
                {shortUrl && <>
                    <h1>Shortened Url</h1>
                    <a href={shortUrl}>{shortUrl}</a>
                    <button onClick={() => {
                        navigator.clipboard.writeText(shortUrl);
                    }}>Copy
                    </button>
                </>}
                {error && <h2>{error}</h2>}
            </div>
        </>
    );
}

export default App;