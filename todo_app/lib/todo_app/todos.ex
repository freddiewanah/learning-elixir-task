defmodule TodoApp.Todos do
  import Ecto.Query, warn: false
  alias TodoApp.Repo

  alias TodoApp.Todos.Todo

  @doc """
  Returns the list of todos.

  """
  def list_todos do
    Repo.all(Todo)
  end

  def list_undeleted_todos do
    Repo.all(from(t in Todo, where: t.deleted == false))
  end

  @doc """
  Gets a single item.

  Raises `Ecto.NoResultsError` if the Item does not exist.

  ## Examples

      iex> get_item!(123)
      %Item{}

      iex> get_item!(456)
      ** (Ecto.NoResultsError)

  """
  def get_todo!(id), do: Repo.get!(Todo, id)

  @doc """
  Creates a item.

  ## Examples

      iex> create_item(%{field: value})
      {:ok, %Item{}}

      iex> create_item(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_todo(attrs \\ %{}) do
    %Todo{}
    |> Todo.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a item.

  ## Examples

      iex> update_item(item, %{field: new_value})
      {:ok, %Item{}}

      iex> update_item(item, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_todo(%Todo{} = todo, attrs) do
    todo
    |> Todo.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a item.

  ## Examples

      iex> delete_item(item)
      {:ok, %Item{}}

      iex> delete_item(item)
      {:error, %Ecto.Changeset{}}

  """
  def delete_todo(%Todo{} = todo) do
    Repo.delete(todo)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking item changes.

  ## Examples

      iex> change_item(item)
      %Ecto.Changeset{source: %Item{}}

  """
  def change_todo(%Todo{} = todo) do
    Todo.changeset(todo, %{})
  end

  def toggle_todo(%Todo{completed: false} = todo) do
    update_todo(todo, %{completed: true})
  end

  def toggle_todo(%Todo{completed: true} = todo) do
    update_todo(todo, %{completed: false})
  end

  def toggle_todo_by_id(todo_id)
      when is_binary(todo_id) or is_integer(todo_id) do
    case Repo.get(Todo, todo_id) do
      nil ->
        {:ok, nil}

      %Todo{} = todo ->
        toggle_todo(todo)
    end
  end
end
