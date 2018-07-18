require "./section"

class Chapter < BaseModel
  table :chapters do
    belongs_to section : Section

    column code : String
    column description : String

    has_many hscodes : Hscode
  end
end
