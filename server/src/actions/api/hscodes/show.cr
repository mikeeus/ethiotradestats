class Api::Hscodes::Show < ApiAction
  include Auth::SkipRequireSignIn

  get "/api/hscodes/:code" do
    json Hscodes::ShowSerializer.new HscodeQuery.new.find_by_code(code)
  end
end
