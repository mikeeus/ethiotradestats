class Api::Hscodes::Search < ApiAction
  include Auth::SkipRequireSignIn

  get "/api/hscodes/search/:query" do
    hscodes = HscodeQuery.new.search query
    json Hscodes::IndexSerializer.new hscodes
  end
end
