class Api::PasswordResets::Create < ApiAction
  include Auth::Api::PasswordResets::Base

  param token : String

  post "/api/password_resets/:user_id" do
    PasswordResetForm.update(user, params) do |form, user|
      if form.saved?
        sign_in user
        head 200
      else
        json({errors: form.errors}, 401)
      end
    end
  end
end
