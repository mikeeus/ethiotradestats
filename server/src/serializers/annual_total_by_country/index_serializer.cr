class AnnualTotalByCountry::IndexSerializer < Lucky::Serializer
  def initialize(@annual_total : Array(AnnualTotalByCountry))
  end

  def render
    @annual_total.map { |annual_total| ShowSerializer.new(annual_total) }
  end
end