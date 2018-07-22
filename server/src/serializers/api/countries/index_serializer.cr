class Api::Countries::IndexSerializer < Lucky::Serializer
  def initialize(@countries : CountryQuery)
  end

  def render
    @countries.map{ |country| ShowSerializer.new(country) }
  end
end
