defmodule TodoApp.Repo.Migrations.CreateTodos do
  use Ecto.Migration

  def change do
    create table(:todos) do
      add(:title, :string, null: false)
      add(:completed, :boolean, default: false)
      add(:scheduled_at, :utc_datetime)

      timestamps()
    end
  end
end
