class AccountSerializer
  include JSONAPI::Serializer

  attributes :id, :email, :username, :created_at

  attribute :created_date do |account|
    account.created_at&.strftime('%m/%d/%Y')
  end
end
