class Heading < BaseModel
  table :headings do
    belongs_to chapter : Chapter
    column code : String
    column description : String
  end
end
