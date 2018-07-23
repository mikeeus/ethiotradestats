class Api::AnnualTotals::Countries::Year < ApiAction
  include Auth::SkipRequireSignIn

  get "/api/countries/annual_totals/year/:year" do
    annual_totals = CountryQuery.new.annual_totals_by_country(year: year.to_i)

    json ({
      annualTotals: AnnualTotalByCountry::IndexSerializer.new(annual_totals),
    })
  end
end
