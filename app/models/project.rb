class Project
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :description, type: String
  field :deadline, type: DateTime

  # belongs_to :account
  has_many :tasks

  validates :name,        presence: true, length: { maximum: 90 }
  validates :description,                 length: { maximum: 280 }
end
