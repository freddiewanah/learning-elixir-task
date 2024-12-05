defmodule TodoApp.Weather.WeatherDay do
  use Ecto.Schema
  import Ecto.Changeset

  schema "weather_days" do
    field :date, :date
    field :high_temp, :decimal
    field :low_temp, :decimal

    timestamps()
  end

  def changeset(weather_day, attrs) do
    weather_day
    |> cast(attrs, [:date, :high_temp, :low_temp])
    |> validate_required([:date])
    |> unique_constraint(:date)
  end
end
