defmodule TodoApp.Todos.Todo do
  use Ecto.Schema
  import Ecto.Changeset

  schema "todos" do
    field(:content, :string)
    field(:completed, :boolean, default: false)
    field(:scheduled_at, :utc_datetime)
    field(:deleted, :boolean, default: false)

    timestamps()
  end

  def changeset(todo, attrs) do
    todo
    |> cast(attrs, [:content, :completed, :scheduled_at, :deleted])
    |> validate_required([:content])
  end
end
