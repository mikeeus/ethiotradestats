class AnnualTotalByCountry::ShowSerializer < Lucky::Serializer
  def initialize(@annual_total_by_country : AnnualTotalByCountry)
  end

  def render
    {
      name: @annual_total_by_country.name,
      short: @annual_total_by_country.short,
      year: @annual_total_by_country.year,
      totalImportsCents: @annual_total_by_country.total_imports_cents,
      totalExportsCents: @annual_total_by_country.total_exports_cents,
      # totalImportTaxCents: @annual_total_by_country.total_import_tax_cents,
      # totalExportTaxCents: @annual_total_by_country.total_export_tax_cents,
    }
  end
end