class Api::Countries::Show < ApiAction
  include Auth::SkipRequireSignIn

  get "/api/countries/:name" do
    country = CountryQuery.new.find_by_name?(URI.unescape(name))
    
    if country.nil?
      head 404
    else
      annual_totals = CountryQuery.new.annual_totals_by_country(country.id)

      json ({
        country: Countries::ShowSerializer.new(country),
        annualTotal: AnnualTotalByCountry::IndexSerializer.new(annual_totals),
      })
    end
  end
end
