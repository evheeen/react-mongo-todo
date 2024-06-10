class Account
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Errors
  include Devise::JWT::RevocationStrategies::Allowlist

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :jwt_authenticatable,
         jwt_revocation_strategy: self

  field :email,                  type: String, default: ''
  field :encrypted_password,     type: String, default: ''
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time
  field :remember_created_at,    type: Time

  field :username, type: String

  has_many :projects
  has_many :tasks
  has_many :labels

  validates :password, presence: true, length: { minimum: 3, maximum: 35 }, confirmation: true, if: :password_required?
  validates :email,    presence: true,                                      uniqueness: { case_sensitive: false }
  validates :username, presence: true, length: { minimum: 3, maximum: 15 }, uniqueness: { case_sensitive: false }

  validates :email, format: { with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/, message: 'Invalid email format' }

  def self.primary_key
    '_id'
  end

  def password_required?
    new_record? || password.present?
  end
end
