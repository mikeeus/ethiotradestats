class HscodeForm < Hscode::BaseForm
  fillable section_id
  fillable chapter_id
  fillable heading_id

  fillable code
  fillable description
  fillable unit
  fillable special_permission

  fillable duty
  fillable excise
  fillable vat
  fillable sur
  fillable withholding
  fillable ss_1
  fillable ss_2
  fillable export_duty

  def prepare
    validate_required section_id
    validate_required chapter_id
    validate_required heading_id
    validate_required code
    validate_required description
  end
end
