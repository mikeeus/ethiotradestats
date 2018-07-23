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

  # Total CIF and Tax collected for a certain country each year.
  def annual_imports(id : Int32)
    LuckyRecord::Repo.run do |db|
      db.query_all annual_imports_sql(id), as: AnnualImports
    end
  end

  # Total FOB and Tax collected for a certain country each year.
  def annual_exports(id : Int32)
    LuckyRecord::Repo.run do |db|
      db.query_all annual_exports_sql(id), as: AnnualExports
    end
  end

  # Total imports and exports for each country for each year.
  def annual_totals_by_country(id : Int32? = nil, year : Int32? = nil)
    LuckyRecord::Repo.run do |db|
      db.query_all annual_totals_by_country_sql(id, year), as: AnnualTotalByCountry
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

  private def annual_totals_by_country_sql(id : Int32? = nil, year : Int32? = nil)
    where_clause = nil

    if id
      where_clause = "WHERE countries.id = #{id}"
    elsif year
      where_clause = "WHERE year = #{year}"
    end

    <<-SQL
      WITH import as (
        SELECT
          countries.name,
          countries.short,
          imports.year,
          COALESCE(sum(cif_usd_cents), 0)::bigint as total_cents,
          COALESCE(sum(tax_usd_cents), 0)::bigint as tax_cents
        FROM imports
        JOIN countries
          ON imports.origin_id = countries.id
        #{where_clause}
        GROUP BY countries.id, imports.year
      )
      SELECT
        import.name,
        import.short,
        import.year,
        import.total_cents as total_imports_cents,
        import.tax_cents as total_import_tax_cents,
        export.total_cents as total_exports_cents,
        export.tax_cents as total_export_tax_cents
      FROM import
      LEFT JOIN (
        SELECT
          countries.name,
          countries.short,
          exports.year,
          COALESCE(sum(fob_usd_cents), 0)::bigint as total_cents,
          COALESCE(sum(tax_usd_cents), 0)::bigint as tax_cents
        FROM exports
        JOIN countries
          ON exports.destination_id = countries.id
        #{where_clause}
        GROUP BY countries.id, exports.year
      ) export
      ON import.year = export.year AND import.short = export.short;
    SQL
  end
end
