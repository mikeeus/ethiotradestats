class Api::SignIns::Create < ApiAction
  include Auth::Api::RequireNotSignedIn

  route do
    SignInForm.new(params).submit do |form, user|
      if user
        sign_in user
        head 200
      else
        head 401
      end
    end
  end
end
