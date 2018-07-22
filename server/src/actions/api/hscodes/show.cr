class Api::Hscodes::Show < ApiAction
  include Auth::SkipRequireSignIn

  get "/api/hscodes/:code" do
    hscode = Hscodes::ShowSerializer.new(HscodeQuery.new.find_by_code(code))
    json({ hscode: hscode })
  end
end
