class Api::AnnualTotals::Countries::Show < ApiAction
  include Auth::SkipRequireSignIn

  get "/api/annual_totals/countries/:name" do
    country = CountryQuery.new.find_by_name?(URI.unescape(name))
    if country.nil?
      head 404
    else
      annual_totals = CountryQuery.new.annual_totals_by_country(country.id)

      json ({
        annualTotal: AnnualTotalByCountry::IndexSerializer.new(annual_totals),
      })
    end
  end
end
