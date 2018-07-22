class AnnualExports::ShowSerializer < Lucky::Serializer
  def initialize(@annual_exports : AnnualExports)
  end

  def render
    {
      year: @annual_exports.year,
      fob_usd_cents: @annual_exports.fob_usd_cents,
      fob_etb_cents: @annual_exports.fob_etb_cents,
      tax_usd_cents: @annual_exports.tax_usd_cents,
      tax_etb_cents: @annual_exports.tax_etb_cents
    }
  end
end