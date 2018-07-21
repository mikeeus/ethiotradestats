class HscodeQuery < Hscode::BaseQuery
  def search(query : String)
    description.ilike("%#{query}%")
  end

  def to_json_array
    Hscodes::IndexSerializer.new(self.results).render
  end

  def to_json
    Hscodes::ShowSerializer.new(self.results).render
  end
end
