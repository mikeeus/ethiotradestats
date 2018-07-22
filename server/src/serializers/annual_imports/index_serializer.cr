class AnnualImports::IndexSerializer < Lucky::Serializer
  def initialize(@annual_imports : Array(AnnualImports))
  end

  def render
    @annual_imports.map { |annual_imports| ShowSerializer.new(annual_imports) }
  end
end