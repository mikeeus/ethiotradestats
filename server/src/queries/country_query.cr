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

  private def annual_imports_sql(id : Int32? = nil)
    where_clause = id ? "WHERE countries.id = #{id}" : ""

    <<-SQL
      SELECT
        imports.year as year,
        COALESCE(sum(imports.cif_usd_cents), 0)::bigint as cif_usd_cents,
        COALESCE(sum(imports.tax_usd_cents), 0)::bigint as tax_usd_cents
      FROM countries
      JOIN imports
        ON imports.origin_id = countries.id
      #{where_clause}
      GROUP BY countries.id, imports.year
      ORDER BY year;
    SQL
  end

  private def annual_exports_sql(id : Int32)
    where_clause = id ? "WHERE countries.id = #{id}" : ""

    <<-SQL
      SELECT
        exports.year as year,
        COALESCE(sum(exports.fob_usd_cents), 0)::bigint as fob_usd_cents,
        COALESCE(sum(exports.tax_usd_cents), 0)::bigint as tax_usd_cents
      FROM countries
      JOIN exports
        ON exports.destination_id = countries.id
      #{where_clause}
      GROUP BY countries.id, exports.year
      ORDER BY year;
    SQL
  end

  private def annual_totals_by_country_sql(id : Int32? = nil, year : Int32? = nil)
    if id
      where_clause = "WHERE countries.id = #{id}"
    elsif year
      where_clause = "WHERE year = #{year}"
    else
      where_clause = nil
    end

    <<-SQL
    SELECT
      merged.name,
      merged.short,
      merged.year,
      COALESCE(sum(merged.total_imports_cents))::bigint as total_imports_cents,
      COALESCE(sum(merged.total_exports_cents))::bigint as total_exports_cents
    FROM (
      (
        SELECT
          countries.name,
          countries.short,
          imports.year,
          COALESCE(sum(cif_usd_cents), 0)::bigint as total_imports_cents,
          0 as total_exports_cents
        FROM imports
        JOIN countries
          ON imports.origin_id = countries.id
        #{where_clause}
        GROUP BY countries.id, imports.year
      )
      UNION
      ( SELECT
          countries.name,
          countries.short,
          exports.year,
          0 as total_imports_cents,
          COALESCE(sum(fob_usd_cents), 0)::bigint as total_exports_cents
        FROM exports
        JOIN countries
          ON exports.destination_id = countries.id
        #{where_clause}
        GROUP BY countries.id, exports.year
      )
    ) merged
    GROUP BY name, short, year
    ORDER BY name;
    SQL
  end
end
