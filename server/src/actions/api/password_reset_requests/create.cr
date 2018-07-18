class Api::PasswordResetRequests::Create < ApiAction
  include Auth::Api::RequireNotSignedIn

  route do
    PasswordResetRequestForm.new(params).submit do |form, user|
      if user
        PasswordResetRequestEmail.new(user).deliver
        json({message: "You should receive an email on how to reset your password shortly"}, Status::OK)
      else
        head 401
      end
    end
  end
end
