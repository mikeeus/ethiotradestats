class ChapterForm < Chapter::BaseForm
  fillable section_id
  fillable code
  fillable description

  def prepare
    validate_required section_id
    validate_required code
    validate_required description
  end
end
