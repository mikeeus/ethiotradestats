class AnnualExports::ShowSerializer < Lucky::Serializer
  def initialize(@annual_exports : AnnualExports)
  end

  def render
    {
      year: @annual_exports.year,
      fobUsdCents: @annual_exports.fob_usd_cents,
      fobEtbCents: @annual_exports.fob_etb_cents,
      taxUsdCents: @annual_exports.tax_usd_cents,
      taxEtbCents: @annual_exports.tax_etb_cents
    }
  end
end