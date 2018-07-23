class AnnualImports::ShowSerializer < Lucky::Serializer
  def initialize(@annual_imports : AnnualImports)
  end

  def render
    {
      year: @annual_imports.year,
      cifUsd: @annual_imports.cif_usd_cents / 100.0,
      taxUsd: @annual_imports.tax_usd_cents / 100.0,
      # cifEtb: @annual_imports.cif_etb_cents / 100.0,
      # taxEtb: @annual_imports.tax_etb_cents / 100.0
    }
  end
end