class Home::Index < ApiAction
  include Auth::SkipRequireSignIn

  get "/" do
    json({hello: "Hello World from Home::Index"})
  end
end
