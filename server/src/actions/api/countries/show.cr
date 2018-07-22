class Api::Countries::Show < ApiAction
  include Auth::SkipRequireSignIn

  get "/api/countries/:name" do
    country = CountryQuery.new.name(URI.unescape(name)).first
    json({ country: Countries::ShowSerializer.new country })
  end
end
