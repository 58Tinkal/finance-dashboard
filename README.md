# Finance Dashboard

A modern, responsive finance dashboard application built with React, Redux, and Node.js. Create customizable widgets to display real-time financial data from various APIs.

## 🚀 Features

### Core Functionality

- **Dynamic Data Mapping**: Explore API responses and select specific fields to display
- **Real-time Updates**: Automatic data refresh with configurable intervals
- **Data Caching**: Intelligent caching system to optimize API calls and reduce redundant requests
- **Customizable Widgets**: Each widget displays as a finance card with editable titles and selected metrics
- **Multiple Display Modes**: View data as cards, tables, or charts
- **Responsive Design**: Fully responsive layout supporting multiple screen sizes

### User Interface & Experience

- **Loading & Error States**: Comprehensive handling of loading, error, and empty data states
- **Dark/Light Theme**: Toggle between themes for better user experience
- **Interactive Field Selection**: JSON explorer for choosing display fields
- **Custom Formatting**: Support for different data formats (currency, percentage, number)

### Data Persistence

- **Browser Storage**: All widget configurations persist across sessions
- **State Recovery**: Complete dashboard restoration upon page refresh
- **Configuration Backup**: Export/import functionality for dashboard configurations

### Advanced Widget Features

- **API Endpoint Management**: Easy configuration of different API endpoints per widget
- **Field Formatting**: Choose display formats for different data types
- **Widget Editing**: Modify widget names and refresh intervals
- **Chart Visualization**: Line and candlestick charts for time-series data

## 🏗️ Architecture

### Frontend (React + Vite)

- **Framework**: React 18 with Vite for fast development
- **State Management**: Redux Toolkit for global state
- **Styling**: Tailwind CSS for responsive design
- **Charts**: Recharts and React Financial Charts
- **Persistence**: Browser localStorage

### Backend (Node.js + Express)

- **Purpose**: Future optimization and scalability
- **Database**: MongoDB with Mongoose (prepared for multi-user features)
- **Testing APIs**: Sample data endpoints for development

## 📁 Project Structure

```
finance-dashboard/
├── README.md                    # Project documentation
├── backend/                     # Backend server (future optimization)
│   ├── server.js               # Express server setup
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── widgetController.js # Widget CRUD operations
│   ├── models/
│   │   └── Widget.js          # MongoDB widget schema
│   ├── routes/
│   │   └── widgetRoutes.js    # API routes
│   └── package.json
├── frontend/                    # React application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── App.jsx            # Main application component
│   │   ├── main.jsx           # Application entry point
│   │   ├── components/        # Reusable UI components
│   │   │   ├── AddWidgetModal.jsx     # Widget creation modal
│   │   │   ├── WidgetCard.jsx         # Card display component
│   │   │   ├── WidgetTable.jsx        # Table display component
│   │   │   ├── WidgetChart.jsx        # Chart display component
│   │   │   ├── WidgetSettingsModal.jsx # Widget settings modal
│   │   │   └── ThemeToggle.jsx        # Theme switcher
│   │   ├── context/
│   │   │   └── ThemeContext.jsx       # Theme context provider
│   │   ├── features/
│   │   │   └── widgets/
│   │   │       └── widgetSlice.js     # Redux slice for widgets
│   │   ├── utils/
│   │   │   ├── useWidgetData.js       # Custom hook for API data
│   │   │   ├── extractKeys.js         # Utility for extracting object keys
│   │   │   └── formatValue.js         # Data formatting utility
│   │   └── app/
│   │       └── store.js               # Redux store configuration
│   ├── index.html              # HTML template
│   ├── package.json            # Dependencies and scripts
│   ├── vite.config.js          # Vite configuration
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   └── jsconfig.json           # JavaScript configuration
└── package.json               # Root package.json (if needed)
```

## 🔧 Backend Role & Future Optimization

The backend is currently **minimal but strategically positioned** for future enhancements:

### Current Usage

- **Development Testing**: Provides sample data endpoints for testing widget functionality
- **API Testing**: `AddWidgetModal` uses backend test endpoints during development

### Testing Endpoints

- `GET /api/test-data` - Returns sample stock market data (25 companies)
- `GET /api/test-chart-data` - Returns sample OHLC chart data

### Future Optimization Potential

- **Database Persistence**: Replace localStorage with MongoDB for multi-user support
- **User Authentication**: Enable user accounts and personalized dashboards
- **Cross-device Sync**: Sync widgets across multiple devices
- **API Proxy**: Handle CORS issues and API key management
- **Server-side Caching**: Reduce external API calls and improve performance
- **Analytics**: Track widget usage and performance metrics
- **Backup/Restore**: Cloud-based configuration backup

### Database Schema (Prepared)

```javascript
const widgetSchema = new mongoose.Schema({
  name: String,
  url: String,
  interval: Number,
  fields: [String],
  displayMode: String, // 'card', 'table', 'chart'
  cardType: String, // 'general', 'watchlist', etc.
  chartType: String, // 'line', 'candle'
  dataInterval: String, // 'daily', 'weekly', etc.
  fieldFormats: Object, // Formatting preferences
  createdAt: Date,
});
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for backend features)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd finance-dashboard
   ```

2. **Install frontend dependencies**

   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd ../backend
   npm install
   ```

4. **Start the backend server**

   ```bash
   npm start
   # Server runs on http://localhost:5000
   ```

5. **Start the frontend development server**
   ```bash
   cd ../frontend
   npm run dev
   # App runs on http://localhost:5173
   ```

## 💡 Usage

### Creating Widgets

1. Click the **"+ Add Widget"** button
2. Enter a widget name and API URL
3. Test the API connection
4. Select fields to display from the API response
5. Choose display mode (Card/Table/Chart)
6. Configure formatting and intervals
7. Save the widget

### Widget Types

- **Card View**: Compact display with selected metrics
- **Table View**: Tabular data with sorting and filtering
- **Chart View**: Visual representation with line/candlestick charts

### Customization

- **Edit Titles**: Click on widget titles to rename
- **Settings**: Use the ⚙️ button to modify refresh intervals
- **Themes**: Toggle between light and dark modes
- **Export/Import**: Backup and restore dashboard configurations

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/finance-dashboard
PORT=5000
```

### API Integration

The app can connect to any REST API that returns JSON data. Examples:

- Financial APIs (Alpha Vantage, Yahoo Finance, etc.)
- Cryptocurrency APIs (CoinGecko, CoinMarketCap)
- Custom business APIs

## 🛠️ Development

### Available Scripts

**Frontend:**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

**Backend:**

```bash
npm start        # Start server with nodemon
```

### Key Technologies

- **Frontend**: React, Redux Toolkit, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Charts**: Recharts, React Financial Charts
- **Build Tool**: Vite

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

For questions or issues:

- Check the testing endpoints for sample data
- Ensure your API endpoints return valid JSON
- Verify CORS settings for external APIs

---

**Note**: This is a client-side focused application with backend infrastructure prepared for future scaling. The backend currently serves testing purposes and can be expanded for multi-user features as needed.</content>
<parameter name="filePath">c:\Users\TINKAL KUMAR\OneDrive\Desktop\finance-dashboard\README.md
