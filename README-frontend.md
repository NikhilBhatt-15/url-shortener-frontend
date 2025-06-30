# URL Shortener Frontend

A modern, beautiful React + TypeScript frontend for the URL shortener application.

## Features

- ✨ **Modern UI/UX**: Beautiful glassmorphism design with gradient backgrounds
- 🔗 **URL Shortening**: Convert long URLs to short, shareable links
- 📊 **Analytics Dashboard**: View detailed click analytics and statistics
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🎯 **Real-time Validation**: Instant URL validation with helpful error messages
- 📋 **One-Click Copy**: Copy shortened URLs to clipboard
- 🔄 **Loading States**: Smooth loading indicators for better UX
- 📈 **Click Tracking**: View recent clicks with IP addresses and referrers

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS3** with modern features (Grid, Flexbox, Backdrop Filter)
- **Fetch API** for HTTP requests

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Backend server running on port 2000

### Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env
```

Edit `.env` and set your backend URL:

```env
VITE_REACT_APP_BASE_URL=http://localhost:2000
```

3. Start development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

## API Integration

The frontend connects to the backend API with these endpoints:

- `POST /shorten` - Create shortened URLs
- `GET /:shortcode` - Redirect to original URL (tracked)
- `GET /analytics/:shortcode` - Get analytics data

## Features Overview

### URL Shortening

- Input validation for proper URL format
- Duplicate detection (reuses existing short URLs)
- Error handling with user-friendly messages
- Loading states during API calls

### Analytics Dashboard

- Total click count
- URL status (active/inactive)
- Creation date
- Recent clicks with:
  - Timestamp
  - IP address
  - Referrer information

### User Experience

- **Responsive Design**: Adapts to all screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized with Vite for fast loading
- **Error Handling**: Comprehensive error messages
- **Loading States**: Visual feedback during operations

## Component Structure

```
src/
├── App.tsx           # Main application component
├── App.css          # Global styles and component CSS
├── vite-env.d.ts    # TypeScript environment definitions
└── main.tsx         # Application entry point
```

## Styling

The application uses a modern design system with:

- **Color Palette**: Purple gradient theme with semantic colors
- **Typography**: Inter font family for clean, readable text
- **Spacing**: Consistent spacing scale for visual harmony
- **Shadows**: Subtle shadows for depth and layering
- **Animations**: Smooth transitions and hover effects

## Browser Support

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Environment Variables

| Variable                  | Description          | Default                 |
| ------------------------- | -------------------- | ----------------------- |
| `VITE_REACT_APP_BASE_URL` | Backend API base URL | `http://localhost:2000` |

## Contributing

1. Follow TypeScript best practices
2. Use semantic commit messages
3. Ensure responsive design
4. Test on multiple browsers
5. Follow the existing code style

## License

MIT License
