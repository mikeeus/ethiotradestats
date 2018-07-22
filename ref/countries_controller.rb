class CountriesController < ApplicationController
  before_action :set_country, only: [:stats, :chart, :tables]

  def stats
    # 1997 to 2016
    number_of_years = 20
    # Average imports
    imports_array = Import.where(country_origin: @country).group(:year).sum(:cif_usd).invert.keys
    average_imports = (imports_array.inject(0.0){ |sum, el| sum + el} / number_of_years).round

    # Average exports
    exports_array = Export.where(destination: @country).group(:year).sum(:fob_usd).invert.keys
    average_exports = (exports_array.inject(0.0){ |sum, el| sum + el} / number_of_years).round

    total_imports = Import.where(country_origin: @country).sum(:cif_usd)
    total_exports = Export.where(destination: @country).sum(:fob_usd)

    render json: {
      avgAnnualImports: average_imports,
      avgAnnualExports: average_exports,
      totalImports: total_imports,
      totalExports: total_exports
    }
  end

  def chart
    @country_annual_imports = CountryAnnualImport.where(country: @country).group(:year).sum(:cif_usd)
    @country_annual_exports = CountryAnnualExport.where(country: @country).group(:year).sum(:fob_usd)
    
    render json: {
      annualImports: @country_annual_imports,
      annualExports: @country_annual_exports
    }
  end

  def tables
    page = params[:page].to_i
    page_length = params[:page_length].to_i

    page_begin = (page - 1) * page_length
    page_end = page_begin + page_length - 1

    type = params[:type] # Either Import/I/i or Export/E/e
    t = type.slice(0)
    year = params[:year]

    if t == 'I' || t == 'i'
      full_table = Import.where(country_origin: @country, year: year).order('cif_usd DESC')
      @table = full_table.to_a.slice(page_begin..page_end)
      @pages = (full_table.count.to_d / page_length).ceil
    elsif t == 'E' || t == 'e'
      full_table = Export.where(destination: @country, year: year).order('fob_usd DESC')
      @table = full_table.to_a.slice(page_begin..page_end)
      @pages = (full_table.count.to_d / page_length).ceil
    end

    pages_array = []
    start = 1
    @pages.times do
      pages_array << start
      start += 1
    end

    render json: {
      table: @table,
      pages: pages_array,
      filter: {
        type: type,
        year: year,
        page: page,
        pageLength: page_length
      }
    }
  end

  private
    def set_country
      @country = params[:country]
    end
    

end
