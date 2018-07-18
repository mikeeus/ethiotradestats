class SectionForm < Section::BaseForm
  fillable code
  fillable description

  def prepare
    validate_required code
    validate_required description
  end
end
