# COVID-19 Tracker

A comprehensive, interactive COVID-19 tracking application that provides real-time statistics and visualization of COVID-19 data worldwide.

![COVID-19 Tracker Screenshot](https://source.unsplash.com/Uk3t05ndSng/800x400)

## Features

- **Global and Country-specific Statistics**: Track cases, deaths, recoveries, and more for any country or globally
- **Interactive Visualizations**: 12+ different charts and graphs showing various aspects of the pandemic
- **Historical Data**: View how the pandemic has evolved over time with historical data tracking
- **Interactive World Map**: See the global distribution of cases with an interactive Leaflet map
- **Country Comparison**: Compare COVID-19 statistics across different countries
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing
- **Real-time Updates**: Data is sourced from the disease.sh API, providing up-to-date information

## Demo

[View Live Demo](https://your-covid19-tracker-demo-url.com)

## Technologies Used

- **React**: Frontend library for building the user interface
- **Chart.js & Recharts**: For creating interactive and responsive charts
- **Leaflet**: For the interactive world map
- **Axios**: For making API requests
- **Disease.sh API**: Source of COVID-19 data
- **React CountUp**: For animated statistics
- **React Select**: For the country dropdown
- **Date-fns**: For date formatting and manipulation

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/covid19-tracker.git
   cd covid19-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint to check code quality
- `npm run preview` - Previews the production build locally

## API Information

This project uses the [disease.sh](https://disease.sh/) API to fetch COVID-19 data. The API provides comprehensive and up-to-date information about the COVID-19 pandemic worldwide.

Key endpoints used:
- `/v3/covid-19/all` - Global data
- `/v3/covid-19/countries` - Country-specific data
- `/v3/covid-19/historical/all` - Historical global data
- `/v3/covid-19/historical/{country}` - Historical country data
- `/v3/covid-19/continents` - Continental data

## Project Structure

```
covid19-tracker/
├── public/            # Public assets
├── src/
│   ├── api/           # API service functions
│   ├── components/    # React components
│   │   ├── charts/    # Chart components
│   │   └── ...        # Other components
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
```

## Deployment

To deploy this application to production:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the contents of the `dist` folder to your hosting provider of choice (Netlify, Vercel, GitHub Pages, etc.)

## Future Enhancements

- Add vaccination data tracking
- Implement predictive modeling for case forecasting
- Add social media sharing capabilities
- Implement more detailed regional data
- Add testing location finder functionality
- Create mobile app versions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Disease.sh](https://disease.sh/) for providing the API
- [World Health Organization](https://www.who.int/) for COVID-19 information
- [Centers for Disease Control and Prevention](https://www.cdc.gov/) for health guidelines
- All the healthcare workers fighting on the frontlines of this pandemic

---

Made with ❤️ and React