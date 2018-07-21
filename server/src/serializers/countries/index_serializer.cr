class Countries::IndexSerializer < Lucky::Serializer
  def initialize(@countries : Array(Country))
  end

  def render
    @countries.map{ |country| Countries::ShowSerializer.new(country) }
  end
end
