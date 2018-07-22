class AnnualImports::ShowSerializer < Lucky::Serializer
  def initialize(@annual_imports : AnnualImports)
  end

  def render
    {
      year: @annual_imports.year,
      cifUsdCents: @annual_imports.cif_usd_cents,
      cifEtbCents: @annual_imports.cif_etb_cents,
      taxUsdCents: @annual_imports.tax_usd_cents,
      taxEtbCents: @annual_imports.tax_etb_cents
    }
  end
end