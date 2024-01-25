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

  embeds_many :notes

  has_and_belongs_to_many :labels

  accepts_nested_attributes_for :labels, allow_destroy: false

  validates :status,      presence: true, inclusion: { in: STATUSES }
  validates :priority,    presence: true, inclusion: { in: PRIORITIES }
  validates :title,       presence: true, length: { maximum: 90 }
  validates :description,                 length: { maximum: 280 }

  def formatted_due_date
    due_date.strftime('%B %e, %Y %l:%M %p') if due_date
  end
end
