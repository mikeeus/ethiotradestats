class Api::SignUps::Create < ApiAction
  include Auth::Api::RequireNotSignedIn

  route do
    head 401
    # SignUpForm.create(params) do |form, user|
    #   if user
    #     sign_in user
    #     head 200
    #   else
    #     json({errors: form.errors}, 400)
    #   end
    # end
  end
end
