class Country < BaseModel
  table :countries do
    column name : String
    column short : String
    column coordinates : String?
    # column aliases : Array(String)
  end
end
