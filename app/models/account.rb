class Account
  include Mongoid::Document
  include Mongoid::Timestamps

  field :username, type: String
  field :email, type: String
  field :password_digest, type: String

  has_many :comments
  has_many :projects
  has_many :tasks
  has_many :labels

  validates :email,           presence: true,                                      uniqueness: { case_sensitive: false }
  validates :username,        presence: true, length: { minimum: 3, maximum: 15 }, uniqueness: { case_sensitive: false }
  validates :password_digest, presence: true

  validates :email, format: { with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/, message: 'Invalid email format' }
end
