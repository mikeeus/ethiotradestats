class User < BaseModel
  include Carbon::Emailable
  include Authentic::PasswordAuthenticatable

  table :users do
    column name : String
    column email : String
    column encrypted_password : String
  end

  def emailable
    Carbon::Address.new(email)
  end

  def generate_token
    payload = {"sub" => id, "exp" => 14.days.from_now.epoch}
    JWT.encode(payload, Lucky::Server.settings.secret_key_base, "HS256")
  end
end
