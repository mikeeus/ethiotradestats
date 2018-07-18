require "./heading"

# Post models a blog article.
# A Harmonized System code that describes a class of products and
# it's tariff rates for Ethiopia
class Hscode < BaseModel
  table :hscodes do
    belongs_to section : Section
    belongs_to chapter : Chapter
    belongs_to heading : Heading

    column code : String
    column description : String
    column unit : String
    column special_permission : String?

    column duty : Int32
    column excise : Int32
    column vat : Int32
    column sur : Int32
    column withholding : Int32
    column ss_1 : Int32?
    column ss_2 : Int32?
    column export_duty : Int32?
  end

  # Returns hscodes that belongs the same HS chapter
  def related
    chapter.hscodes.reject { |hs| hs.id == id }
  end

  def exports_by_year(page = 1, page_length = 10)
    LuckyRecord::Repo.run do |db|
      db.query_all exports_by_year_sql, code, as: TableRow
    end
  end

  def imports_by_year(page = 1, page_length = 10)
    LuckyRecord::Repo.run do |db|
      db.query_all imports_by_year_sql, code, as: TableRow
    end
  end

  private def exports_by_year_sql
    <<-SQL
      SELECT exports.year, countries.name as country, sum(fob_usd_cents)::bigint as total
      FROM exports
      JOIN countries
      ON countries.id = exports.destination_id
      JOIN hscodes ON hscodes.id = exports.hscode_id
      WHERE hscodes.code = $1
      GROUP BY exports.year, country
      ORDER BY year DESC, total DESC
      LIMIT #{page_length}
      OFFSET #{(page - 1) * page_length};
    SQL
  end

  private def imports_by_year_sql
    <<-SQL
      SELECT imports.year, countries.name as country, sum(cif_usd_cents)::bigint as total
      FROM imports
      JOIN countries
      ON countries.id = imports.origin_id
      JOIN hscodes ON hscodes.id = imports.hscode_id
      WHERE hscodes.code = $1
      GROUP BY imports.year, country
      ORDER BY year DESC, total DESC
      LIMIT #{page_length}
      OFFSET #{(page - 1) * page_length};
    SQL
  end
end

class TableRow
  DB.mapping({
    year: Int32,
    country: String,
    total: Int64
  })
end