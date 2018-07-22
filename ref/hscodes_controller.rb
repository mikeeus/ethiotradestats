class HscodesController < ApplicationController
  before_action :set_hscode, only: [:show, :tables]

  # GET /hscodes
  def index
    @hscodes = Hscode.all.to_a.slice(1..-1)

    render json: @hscodes
  end

  # GET /hscodes/1
  def show
    related_codes = []
    @hscode.related_codes.each do |rel_code|
      if rel_code.code != @hscode.code 
        related_codes << rel_code
      end
    end
    render json: {
      hscode: @hscode,
      relatedCodes: related_codes.sort
    }
  end

  def chart
    @code = params[:code]
    @hscode_annual_imports = HscodeAnnualImport.where(code: @code).group(:year).sum(:cif_usd)
    @hscode_annual_exports = HscodeAnnualExport.where(code: @code).group(:year).sum(:fob_usd)
  
    render json: {
      annualImports: @hscode_annual_imports,
      annualExports: @hscode_annual_exports
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
      full_table = @hscode.imports.where(year: year).order('cif_usd DESC')
      @table = full_table.to_a.slice(page_begin..page_end)
      @pages = (full_table.count.to_d / page_length).ceil

    elsif t == 'E' || t == 'e'
      full_table = @hscode.exports.where(year: year).order('fob_usd DESC')
      @table = full_table.to_a.slice(page_begin..page_end)
      @pages = (full_table.count / page_length).ceil
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

  def search
    search_term = params[:search]
    @search_result = HscodeSearch.new(search_term).search
    render json: @search_result
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hscode
      @hscode = Hscode.find_by(code: params[:code])
    end

    # Only allow a trusted parameter "white list" through.
    def hscode_params
      params.fetch(:hscode, {})
    end
end
