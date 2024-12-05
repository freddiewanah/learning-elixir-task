import WeatherCard from "./weather-card";
import { Weather } from "../types/weather";

interface TitleBarProps {
  weather: Weather | undefined;
}

export default function TitleBar({ weather }: TitleBarProps) {
  return (
    <div className="flex justify-between items-center pb-4">
      <h1 className="text-2xl font-bold text-black">Todo List</h1>
      <WeatherCard weather={weather} />
    </div>
  );
}
