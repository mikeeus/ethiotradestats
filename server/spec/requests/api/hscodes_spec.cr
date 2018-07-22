require "../../spec_helper"

describe "Hscodes" do
  it "searches hscode by description" do
    request = AppRequest.new

    live_horses = build_live_horses_hcsode

    request.get "/api/hscodes/search/" + URI.escape("live horses")

    request.response.status_code.should eq 200
    request.response_json[0]["code"].should eq live_horses.code
  end

  it "gets hscode by code" do
    request = AppRequest.new

    live_horses = build_live_horses_hcsode

    request.get "/api/hscodes/" + live_horses.code

    request.response.status_code.should eq 200
    request.response_json["code"].should eq live_horses.code
  end
end

def build_live_horses_hcsode
  section = SectionBox.new.create
  chapter = ChapterBox.new.section_id(section.id).create
  heading = HeadingBox.new.chapter_id(chapter.id).create
  live_horses = HscodeBox.new
                         .section_id(section.id)
                         .chapter_id(chapter.id)
                         .heading_id(heading.id)
                         .create
  live_horses
end