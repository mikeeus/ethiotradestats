class CountryForm < Country::BaseForm
  fillable name
  fillable short
  fillable coordinates
  # fillable aliases

  def prepare
    validate_required name
    validate_required short
  end
end
