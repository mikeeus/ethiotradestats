class AnnualTotalByCountry
  DB.mapping({
    name: String,
    short: String,
    year: Int32,
    total_imports_cents: Int64,
    total_exports_cents: Int64,
    # total_import_tax_cents: Int64,
    # total_export_tax_cents: Int64,
  })
end
