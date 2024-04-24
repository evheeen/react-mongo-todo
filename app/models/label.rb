class Label
  include Mongoid::Document

  field :name, type: String

  belongs_to :account

  has_and_belongs_to_many :tasks

  validates :name, presence: true, length: { maximum: 30 }
end
