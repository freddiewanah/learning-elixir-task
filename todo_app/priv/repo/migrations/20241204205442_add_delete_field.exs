defmodule TodoApp.Repo.Migrations.AddDeletedField do
  use Ecto.Migration

  def change do
    alter table(:todos) do
      add(:deleted, :boolean, default: false)
    end
  end
end
