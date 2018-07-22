class YearsController < ApplicationController
  before_action :years, only: [:year, :year_summary]

  def charts_tables
    if @years.include?(params[:year])
      @year = params[:year]

      # Countries
      @top_ten_countries_import = CountryAnnualImport.where(year: @year).group(:country).sum(:cif_usd).invert.sort.reverse.slice(0..9)
      @top_ten_countries_export = CountryAnnualExport.where(year: @year).group(:country).sum(:fob_usd).invert.sort.reverse.slice(0..9)

      # Hscodes
      @top_ten_hscodes_import = HscodeAnnualImport.where(year: @year).group(:code, :description).sum(:cif_usd).invert.sort.reverse.slice(0..9)
      @top_ten_hscodes_export = HscodeAnnualExport.where(year: @year).group(:code, :description).sum(:fob_usd).invert.sort.reverse.slice(0..9)

      render json: {
        topTenCountriesImport: @top_ten_countries_import,
        topTenCountriesExport: @top_ten_countries_export,
        topTenHscodesImport: @top_ten_hscodes_import,
        topTenHscodesExport: @top_ten_hscodes_export
      }
    end
  end

  def year_summary

    if @years.include?(params[:year])
      @year = params[:year]

      @country_import = CountryAnnualImport.where(year: @year)
      @country_export = CountryAnnualExport.where(year: @year)

      # Totals
      @total_imports = @country_import.sum(:cif_usd)
      @total_exports = @country_export.sum(:fob_usd)
      @countries_imported_from = @country_import.count
      @countries_exported_to = @country_export.count

      render json: {
          totalImports: @total_imports,
          totalExports: @total_exports,
          countriesImportedFrom: @countries_imported_from,
          countriesExportedTo: @countries_exported_to
      }
    end  
  end

  private
    
    def years
      @years = ["2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997"]
    end

end
