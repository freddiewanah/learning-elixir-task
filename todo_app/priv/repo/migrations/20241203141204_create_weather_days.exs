defmodule TodoApp.Repo.Migrations.CreateWeatherDays do
  use Ecto.Migration

  def change do
    create table(:weather_days) do
      add :date, :date, null: false
      add :high_temp, :decimal
      add :low_temp, :decimal

      timestamps()
    end

    create unique_index(:weather_days, [:date])
  end
end
