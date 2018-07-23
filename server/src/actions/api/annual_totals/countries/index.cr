class Api::AnnualTotals::Countries::Index < ApiAction
  include Auth::SkipRequireSignIn

  get "/api/annual_totals/countries" do
    annual_totals = CountryQuery.new.annual_totals_by_country

    json ({
      annualTotals: AnnualTotalByCountry::IndexSerializer.new(annual_totals),
    })
  end
end
