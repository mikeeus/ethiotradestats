abstract class ApiAction < Lucky::Action
  # By default all actions require sign in, unless you use the
  # `Auth::SkipRequireSignIn` module in `src/mixins/auth/skip_require_sign_in.cr`
  include Auth::Api::RequireSignIn

  # This method tells Authentic how to find the current user
  private def find_current_user(id) : User
    UserQuery.find(id)
  end

  # Add pipes and methods that are for all API requests
end
