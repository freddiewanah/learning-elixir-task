defmodule TodoApp.Repo.Migrations.UpdateTodosColumn do
  use Ecto.Migration

  def change do
    rename(table(:todos), :title, to: :content)
  end
end
