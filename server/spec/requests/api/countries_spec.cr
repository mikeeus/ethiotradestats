require "../../spec_helper"

describe "Countries" do
  it "gets list of country names" do
    request = AppRequest.new

    ethiopia = CountryBox.new.create
    canada = CountryBox.new.name("Canada").short("CA").create

    request.get "/api/countries"

    request.response.status_code.should eq 200
    request.response_json.to_s.should eq %(["Ethiopia", "Canada"])
  end

  it "gets country" do
    request = AppRequest.new

    united_states = CountryBox.new.name("United States").short("US").create

    request.get "/api/countries/" + URI.escape(united_states.name)

    request.response.status_code.should eq 200
    request.response_json["country"]["name"].should eq united_states.name
  end
end