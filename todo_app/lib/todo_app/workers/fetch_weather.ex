defmodule TodoApp.Workers.FetchWeather do
  use Oban.Worker,
    max_attempts: 3,
    priority: 0,
    queue: :default

  alias TodoApp.Repo
  alias TodoApp.Weather.WeatherDay

  @base_url "https://api.open-meteo.com/v1/forecast"
  @params %{
    latitude: -37.814,
    longitude: 144.9633,
    daily: "temperature_2m_max,temperature_2m_min",
    timezone: "Australia/Sydney",
    forecast_days: 1
  }

  @impl Oban.Worker
  def perform(_args) do
    url = "#{@base_url}?#{URI.encode_query(@params)}"

    case HTTPoison.get(url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        case Jason.decode(body) do
          {:ok, %{"daily" => daily}} ->
            weather_attrs = %{
              date: Date.from_iso8601!(Enum.at(daily["time"], 0)),
              high_temp: Enum.at(daily["temperature_2m_max"], 0),
              low_temp: Enum.at(daily["temperature_2m_min"], 0)
            }

            %WeatherDay{}
            |> WeatherDay.changeset(weather_attrs)
            |> Repo.insert()

          {:error, _} ->
            {:error, "Failed to decode response"}
        end

      {:ok, %HTTPoison.Response{status_code: status_code, body: body}} ->
        {:error, "Status code: #{status_code}, body: #{inspect(body)}"}

      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, reason}
    end
  end
end
