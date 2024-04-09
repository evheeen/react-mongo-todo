class AccountSerializer
  require 'jwt'

  include JSONAPI::Serializer

  attributes :id, :email, :created_at

  attribute :created_date do |account|
    account.created_at&.strftime('%m/%d/%Y')
  end

  attribute :access_token do |account|
    JWT.encode({ account_id: account.id }, ENV['DEVISE_JWT_SECRET_KEY'], 'HS256')
  end
end
