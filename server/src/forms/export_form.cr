class ExportForm < Export::BaseForm
  fillable hscode_id
  fillable destination_id

  fillable year
  fillable month
  fillable cpc
  fillable quantity

  fillable mass_gross_kg
  fillable mass_net_kg
  fillable fob_etb_cents
  fillable fob_usd_cents
  fillable tax_etb_cents
  fillable tax_usd_cents

  fillable unique_hash

  def prepare
    validate_required hscode_id
    validate_required destination_id

    validate_required year
    validate_required mass_net_kg
    validate_required fob_etb_cents
    validate_required fob_usd_cents

    validate_required unique_hash
  end
end
