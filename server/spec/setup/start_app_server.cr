app = App.new

spawn do
  app.listen
end

at_exit do
  app.close
end
