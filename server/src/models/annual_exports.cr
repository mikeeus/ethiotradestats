class AnnualExports
  DB.mapping({
    year: Int32,
    fob_usd_cents: Int64,
    fob_etb_cents: Int64,
    tax_usd_cents: Int64,
    tax_etb_cents: Int64
  })
end
