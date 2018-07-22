class Api::Countries::ShowSerializer < Lucky::Serializer
  def initialize(@country : Country)
  end

  def render
    {
      id:    @country.id,
      name: @country.name,
      short: @country.short,
    }
  end
end
