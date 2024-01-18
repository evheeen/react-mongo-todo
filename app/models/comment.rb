class Comment
  include Mongoid::Document
  include Mongoid::Timestamps

  field :body, type: String

  belongs_to :account
  belongs_to :task

  validates :body, presence: true, length: { maximum: 280 }
end
