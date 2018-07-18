# An Import record
class Import < BaseModel
  table :imports do
    belongs_to hscode : Hscode
    belongs_to origin : Country
    belongs_to consignment : Country

    column year : Int32
    column month : Int32?
    column cpc : String?
    column quantity : Int64?

    column mass_gross_kg : Int64?
    column mass_net_kg : Int64
    column cif_etb_cents : Int64
    column cif_usd_cents : Int64
    column tax_etb_cents : Int64?
    column tax_usd_cents : Int64?

    column unique_hash : String
  end

  def self.build_hash(hscode_id, year, month, cpc, origin_id, consignment_id, cif_etb_cents, cif_usd_cents)
    Base64.encode("#{hscode_id}|#{year}|#{month}|#{cpc}|#{origin_id}|#{consignment_id}|#{cif_etb_cents}|#{cif_usd_cents}")
  end

  def build_hash
    Import.build_hash(hscode_id, year, month, cpc, origin_id, consignment_id, cif_etb_cents, cif_usd_cents)
  end
end
