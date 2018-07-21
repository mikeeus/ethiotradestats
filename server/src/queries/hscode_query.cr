class HscodeQuery < Hscode::BaseQuery
  def search(query : String)
    description.ilike("%#{query}%")
  end

  def find_by_code(code : String)
    preload_heading.preload_chapter.preload_section.code(code).first
  end

  def to_json_array
    Hscodes::IndexSerializer.new(self.results).render
  end

  def to_json
    Hscodes::ShowSerializer.new(self.results).render
  end
end
