class HeadingForm < Heading::BaseForm
  fillable chapter_id
  fillable code
  fillable description

  def prepare
    validate_required chapter_id
    validate_required code
    validate_required description
  end
end
