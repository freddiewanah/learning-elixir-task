defmodule TodoApp.Workers.CompleteTodo do
  use Oban.Worker,
    max_attempts: 3,
    priority: 0,
    queue: :default

  alias TodoApp.Todos.Todo
  alias TodoApp.Repo
  import Ecto.Query

  @impl Oban.Worker
  def perform(_) do
    now = DateTime.utc_now()

    from(t in Todo, where: t.scheduled_at <= ^now)
    |> Repo.update_all(set: [completed: true])

    :ok
  end
end
