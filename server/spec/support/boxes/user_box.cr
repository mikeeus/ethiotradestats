class UserBox < LuckyRecord::Box
  def initialize
    name "Mikias"
    email "test@example.com"
    encrypted_password Authentic.generate_encrypted_password("password")
  end
end
