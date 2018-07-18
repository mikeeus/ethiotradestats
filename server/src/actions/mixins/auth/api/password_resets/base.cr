module Auth::Api::PasswordResets::Base
  macro included
    include Auth::Api::RequireNotSignedIn
    include Auth::Api::PasswordResets::FindUser
    include Auth::Api::PasswordResets::RequireToken
  end
end
