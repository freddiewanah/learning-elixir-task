import { useState } from "react";
import { Weather } from "../types/weather";

interface WeatherCardProps {
  weather: Weather | undefined;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  if (!weather) return null;

  return (
    <div className="p-2 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center space-y-2">
        <p className="font-semibold text-gray-600">{weather.date}</p>

        <p className="text-sm flex items-center justify-between gap-2">
          <span className="text-gray-600">Day High:</span>
          <span className="font-medium text-red-500">{weather.highTemp}°C</span>
        </p>

        <p className="text-sm flex items-center justify-between gap-2">
          <span className="text-gray-600">Day Low:</span>
          <span className="font-medium text-blue-500">{weather.lowTemp}°C</span>
        </p>
      </div>
    </div>
  );
}
