class Api::Countries::Show < ApiAction
  include Auth::SkipRequireSignIn

  get "/api/countries/:name" do
    country = CountryQuery.new.name(URI.unescape(name)).first
    annual_imports = CountryQuery.new.annual_imports(country.id)
    annual_exports = CountryQuery.new.annual_exports(country.id)

    json({
      country: Countries::ShowSerializer.new(country),
      annual_imports: AnnualImports::IndexSerializer.new(annual_imports),
      annual_exports: AnnualExports::IndexSerializer.new(annual_exports)
    })
  end
end
