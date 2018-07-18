require "base64"

class ImportForm < Import::BaseForm
  fillable hscode_id
  fillable origin_id
  fillable consignment_id

  fillable year
  fillable month
  fillable cpc
  fillable quantity

  fillable mass_gross_kg
  fillable mass_net_kg
  fillable cif_etb_cents
  fillable cif_usd_cents
  fillable tax_etb_cents
  fillable tax_usd_cents

  fillable unique_hash

  def prepare
    validate_required hscode_id
    validate_required origin_id
    validate_required consignment_id

    validate_required year
    validate_required mass_net_kg
    validate_required cif_etb_cents
    validate_required cif_usd_cents

    validate_required unique_hash
  end
end
