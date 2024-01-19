class Label
  include Mongoid::Document

  field :name, type: String

  belongs_to :account

  embeds_many :label_associations
  embeds_many :tasks, store_as: :label_associations, class_name: 'Task'

  validates :name, presence: true, length: { maximum: 30 }
end
