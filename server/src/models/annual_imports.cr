class AnnualImports
  DB.mapping({
    year: Int32,
    cif_usd_cents: Int64,
    cif_etb_cents: Int64,
    tax_usd_cents: Int64,
    tax_etb_cents: Int64
  })
end
