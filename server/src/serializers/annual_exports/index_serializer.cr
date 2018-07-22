class AnnualExports::IndexSerializer < Lucky::Serializer
  def initialize(@annual_exports : Array(AnnualExports))
  end

  def render
    @annual_exports.map { |annual_exports| ShowSerializer.new(annual_exports) }
  end
end