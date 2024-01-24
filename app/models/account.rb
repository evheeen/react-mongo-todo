class Account
  include Mongoid::Document
  include Mongoid::Timestamps

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  field :email,                  type: String, default: ''
  field :encrypted_password,     type: String, default: ''
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time
  field :remember_created_at,    type: Time

  field :username,        type: String

  has_many :projects
  has_many :tasks
  has_many :labels

  validates :email,           presence: true,                                      uniqueness: { case_sensitive: false }
  validates :username,        presence: true, length: { minimum: 3, maximum: 15 }, uniqueness: { case_sensitive: false }

  validates :email, format: { with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/, message: 'Invalid email format' }
end
