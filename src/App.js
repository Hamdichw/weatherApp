import "./App.css";
import DailyAccess from "./components/DailyAccess";
import Details from "./components/Details";
import SearchBar from "./components/SearchBar";
import TimeLocation from "./components/TimeLocation";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./Services/Service";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState({ q: 'london' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const msg = query.q ? query.q : 'current location.';
    toast.info('Fetching Weather for ' + msg);

    const fetchData = async () => {
      try {
        const res = await getFormattedWeatherData({ ...query, units });
        toast.success('Successfully fetched weather');
        setWeather(res);
      } catch (error) {
        toast.error('Error fetching weather');
        setWeather(null);
      }
    };

    fetchData();
  }, [query, units]);

  const changeBackground = () => {
    if (!weather) return darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-cyan-600 to-blue-800';

    const threshold = units === 'metric' ? 30 : 60;

    if (weather.temp <= threshold) return darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-cyan-600 to-blue-800';

    return darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-yellow-600 to-orange-800';
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`container mx-auto max-w-screen-md mt-4 py-5 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 ${changeBackground()}`}>
      <div className="flex justify-end mb-4">
        <button
          className="p-2 rounded-md text-white bg-gray-800 hover:bg-gray-700"
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <DailyAccess setQuery={setQuery} />
      <SearchBar setQuery={setQuery} setUnits={setUnits} units={units} />

      {weather && (
        <>
          <TimeLocation weather={weather} />
          <Details weather={weather} />
          <Forecast title="Hourly Forecast" items={weather.hourly} />
          <Forecast title="Daily Forecast" items={weather.daily} />
        </>
      )}

      <ToastContainer autoClose={700} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
