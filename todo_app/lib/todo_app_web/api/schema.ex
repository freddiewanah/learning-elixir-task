defmodule TodoAppWeb.Api.Schema do
  use Absinthe.Schema
  alias TodoApp.Todos

  import_types(Absinthe.Type.Custom)

  object :todo_item do
    # ID!
    field(:id, non_null(:id))
    field(:content, non_null(:string))
    field(:completed, non_null(:boolean))
    field(:deleted, non_null(:boolean))
    field(:scheduled_at, non_null(:datetime))
  end

  object :weather_day do
    field(:date, non_null(:date))
    field(:high_temp, non_null(:decimal))
    field(:low_temp, non_null(:decimal))
  end

  mutation do
    field :create_todo_item, :todo_item do
      arg(:content, non_null(:string))
      arg(:scheduled_at, non_null(:string))

      resolve(fn %{content: content, scheduled_at: scheduled_at}, _ ->
        Todos.create_todo(%{content: content, scheduled_at: scheduled_at})
      end)
    end

    field :delete_todo_item, :boolean do
      arg(:id, non_null(:id))

      resolve(fn %{id: id}, _ ->
        todo = Todos.get_todo!(id)
        Todos.update_todo(todo, %{deleted: true})
        {:ok, true}
      end)
    end

    field :update_todo_item, :todo_item do
      arg(:id, non_null(:id))
      arg(:content, non_null(:string))

      resolve(fn %{id: id, content: content}, _ ->
        todo = Todos.get_todo!(id)
        Todos.update_todo(todo, %{content: content})
      end)
    end

    field :update_todo_item_scheduled_at, :todo_item do
      arg(:id, non_null(:id))
      arg(:scheduled_at, non_null(:string))

      resolve(fn %{id: id, scheduled_at: scheduled_at}, _ ->
        todo = Todos.get_todo!(id)
        Todos.update_todo(todo, %{scheduled_at: scheduled_at})
      end)
    end

    field :toggle_todo_item, :todo_item do
      arg(:id, non_null(:id))

      resolve(fn %{id: todo_id}, _ ->
        Todos.toggle_todo_by_id(todo_id)
      end)
    end
  end

  query do
    field :todo_items, non_null(list_of(non_null(:todo_item))) do
      resolve(fn _, _ ->
        {:ok, Todos.list_undeleted_todos()}
      end)
    end

    field :weather_day, non_null(:weather_day) do
      resolve(fn _, _ ->
        {:ok, TodoApp.Weather.get_latest_weather()}
      end)
    end
  end
end
