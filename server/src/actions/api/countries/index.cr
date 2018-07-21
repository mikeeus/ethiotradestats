class Api::Countries::Index < ApiAction
  include Auth::SkipRequireSignIn

  route do
    json CountryQuery.new.names
  end
end
