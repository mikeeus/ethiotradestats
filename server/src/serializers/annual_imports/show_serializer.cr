class AnnualImports::ShowSerializer < Lucky::Serializer
  def initialize(@annual_imports : AnnualImports)
  end

  def render
    {
      year: @annual_imports.year,
      cif_usd_cents: @annual_imports.cif_usd_cents,
      cif_etb_cents: @annual_imports.cif_etb_cents,
      tax_usd_cents: @annual_imports.tax_usd_cents,
      tax_etb_cents: @annual_imports.tax_etb_cents
    }
  end
end