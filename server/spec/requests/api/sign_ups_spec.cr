require "../../spec_helper"

describe "SignUps" do
  it "creates user on sign up" do
    request = AppRequest.new

    request.post("/api/sign_ups", ({
      "sign_up:name"                 => "Mikias",
      "sign_up:email"                 => "sign_up@test.com",
      "sign_up:password"              => "password",
      "sign_up:password_confirmation" => "password",
    }))

    request.response.status_code.should eq 401

    # new_user = UserQuery.new.email("test@email.com").first
    # new_user.should_not be_nil

    # request.response.headers["Authorization"].should eq new_user.generate_token
  end
end
