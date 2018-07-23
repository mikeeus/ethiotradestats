class AnnualExports::ShowSerializer < Lucky::Serializer
  def initialize(@annual_exports : AnnualExports)
  end

  def render
    {
      year: @annual_exports.year,
      fobUsd: @annual_exports.fob_usd_cents / 100.0,
      taxUsd: @annual_exports.tax_usd_cents / 100.0,
      # fobEtb: @annual_exports.fob_etb_cents / 100.0,
      # taxEtb: @annual_exports.tax_etb_cents / 100.0
    }
  end
end