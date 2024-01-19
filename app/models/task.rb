class Task
  include Mongoid::Document
  include Mongoid::Timestamps

  STATUSES   = %i[pending in_progress completed cancelled]
  PRIORITIES = %i[lowest low medium high highest]

  field :title, type: String
  field :description, type: String
  field :due_date, type: DateTime
  field :status, type: StringifiedSymbol, default: :pending
  field :priority, type: StringifiedSymbol, default: :medium

  belongs_to :account
  belongs_to :project, optional: true

  has_many :comments

  embeds_many :label_associations
  embeds_many :labels, store_as: :label_associations, class_name: 'Label'

  validates :status,      presence: true, inclusion: { in: STATUSES }
  validates :priority,    presence: true, inclusion: { in: PRIORITIES }
  validates :title,       presence: true, length: { maximum: 90 }
  validates :description,                 length: { maximum: 280 }
end
