defmodule TodoApp.Weather do
  alias TodoApp.Repo
  alias TodoApp.Weather.WeatherDay

  def get_latest_weather() do
    WeatherDay
    |> Ecto.Query.last(:date)
    |> Repo.one()
  end
end
