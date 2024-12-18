defmodule TodoAppWeb.Router do
  use TodoAppWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_live_flash)
    plug(:put_root_layout, html: {TodoAppWeb.Layouts, :root})
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  # Other scopes may use custom stacks.
  # scope "/api", TodoAppWeb do
  #   pipe_through :api
  # end

  scope "/api" do
    pipe_through(:api)

    get("/graphql", Absinthe.Plug.GraphiQL,
      schema: TodoAppWeb.Api.Schema,
      interface: :playground
    )

    post("/graphql", Absinthe.Plug, schema: TodoAppWeb.Api.Schema)
  end

  # scope "/", TodoAppWeb do
  #   pipe_through(:browser)

  #   get("/*path", PageController, :index)
  # end

  # Enable LiveDashboard in development
  if Application.compile_env(:todo_app, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through(:browser)

      live_dashboard("/dashboard", metrics: TodoAppWeb.Telemetry)
    end
  end
end
