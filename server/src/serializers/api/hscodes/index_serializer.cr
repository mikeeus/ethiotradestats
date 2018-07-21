class Api::Hscodes::IndexSerializer < Lucky::Serializer
  def initialize(@hscodes : HscodeQuery)
  end

  def render
    @hscodes.map { |hscode| ShowSerializer.new(hscode) }
  end
end