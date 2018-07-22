class CountryQuery < Country::BaseQuery
  def find_by_name?(name : String)
    LuckyRecord::Repo.run do |db|
      _name = PG::EscapeHelper.escape_literal(name)
      statement = "SELECT id, name, short, coordinates, created_at, updated_at FROM countries WHERE name ILIKE #{_name} OR #{_name} ILIKE ANY (aliases)"
      db.query_one? statement, as: Country
    end
  end

  def names
    order_by(:name, :asc).map &.name
  end

  def annual_imports(id : Int32)
    LuckyRecord::Repo.run do |db|
      db.query_all annual_imports_sql(id), as: AnnualImports
    end
  end

  def annual_exports(id : Int32)
    LuckyRecord::Repo.run do |db|
      db.query_all annual_exports_sql(id), as: AnnualExports
    end
  end

  private def annual_imports_sql(id : Int32)
    <<-SQL
      SELECT
        imports.year as year,
        COALESCE(sum(imports.cif_usd_cents), 0)::bigint as cif_usd_cents,
        COALESCE(sum(imports.cif_etb_cents), 0)::bigint as cif_etb_cents,
        COALESCE(sum(imports.tax_usd_cents), 0)::bigint as tax_usd_cents,
        COALESCE(sum(imports.tax_etb_cents), 0)::bigint as tax_etb_cents
      FROM countries
      JOIN imports
        ON imports.origin_id = countries.id
      WHERE countries.id = #{id}
      GROUP BY countries.id, imports.year;
    SQL
  end

  private def annual_exports_sql(id : Int32)
    <<-SQL
      SELECT
        exports.year as year,
        COALESCE(sum(exports.fob_usd_cents), 0)::bigint as fob_usd_cents,
        COALESCE(sum(exports.fob_etb_cents), 0)::bigint as fob_etb_cents,
        COALESCE(sum(exports.tax_usd_cents), 0)::bigint as tax_usd_cents,
        COALESCE(sum(exports.tax_etb_cents), 0)::bigint as tax_etb_cents
      FROM countries
      JOIN exports
        ON exports.destination_id = countries.id
      WHERE countries.id = #{id}
      GROUP BY countries.id, exports.year;
    SQL
  end
end



