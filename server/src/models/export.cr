require "./hscode"

# An Export record
class Export < BaseModel
  table :exports do
    belongs_to hscode : Hscode
    belongs_to destination : Country

    column year : Int32
    column month : Int32?
    column cpc : String?
    column quantity : Int64?

    column mass_gross_kg : Int64?
    column mass_net_kg : Int64
    column fob_etb_cents : Int64
    column fob_usd_cents : Int64
    column tax_etb_cents : Int64?
    column tax_usd_cents : Int64?

    column unique_hash : String
  end

  def self.build_hash(hscode_id, year, month, cpc, destination_id, fob_etb, fob_usd)
    Base64.encode("#{hscode_id}|#{year}|#{month}|#{cpc}|#{destination_id}|#{fob_etb}|#{fob_usd}")
  end

  def build_hash
    Export.build_hash(hscode_id, year, month, cpc, destination_id, fob_etb, fob_usd)
  end
end
