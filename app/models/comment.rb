class Comment
  include Mongoid::Document
  include Mongoid::Timestamps

  field :body, type: String

  belongs_to :account

  embedded_in :task

  validates :body, presence: true, length: { maximum: 280 }
end
