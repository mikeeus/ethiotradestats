class Api::PasswordResets::New < ApiAction
  include Auth::Api::PasswordResets::Base

  param token : String

  get "/api/password_resets/:user_id" do
    text "Please configure password reset page on client."
  end
end
