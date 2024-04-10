class ApplicationController < ActionController::API
  respond_to :json

  before_action :authenticate_account!

  private

    def authenticate_account!
      if request.headers['Authorization'].present?
        begin
          jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, ENV['DEVISE_JWT_SECRET_KEY']).first
          @current_account = Account.find(jwt_payload['account_id']['$oid'])
        rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
          render json: { error: e.message }, status: :unauthorized
        end
      else
        render json: { error: 'You need to sign in or sign up before continuing.' }, status: :unauthorized
      end
    end
end
