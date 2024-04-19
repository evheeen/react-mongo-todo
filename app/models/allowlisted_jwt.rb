class AllowlistedJwt < ApplicationRecord
  include Mongoid::Document
  include Mongoid::Timestamps

  field :jti, type: String
  field :aud, type: String
  field :exp, type: DateTime

  belongs_to :account

  index({ jti: 1 }, { unique: true })
end
