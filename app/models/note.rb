class Note
  include Mongoid::Document
  include Mongoid::Timestamps

  field :body, type: String

  embedded_in :task

  validates :body, presence: true, length: { maximum: 280 }
end
