class Section < BaseModel
  table :sections do
    column code : String
    column description : String
  end
end
