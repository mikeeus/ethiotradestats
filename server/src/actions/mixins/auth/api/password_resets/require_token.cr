module Auth::Api::PasswordResets::RequireToken
  macro included
    before require_valid_password_reset_token
  end

  abstract def token : String
  abstract def user : User

  private def require_valid_password_reset_token
    if Authentic.valid_password_reset_token?(user, token)
      continue
    else
      json({message: "The password reset link is incorrect or expired. Please try again."}, 401)
    end
  end
end
