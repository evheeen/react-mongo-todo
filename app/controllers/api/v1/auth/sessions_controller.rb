module Api
  module V1
    module Auth
      class SessionsController < Devise::SessionsController
        respond_to :json

        before_action :authenticate_account!, only: :destroy
        skip_before_action :verify_signed_out_user, only: :destroy

        def destroy
          return super if request.headers['Authorization'].nil?
          revoke_token(current_account)
          sign_out(current_account)
          respond_to_on_destroy
        end

        protected

          def sign_in_params
            params.require(:account).permit(:email, :password)
          end

        private

          def respond_with(resource, _opts = {})
            render json: {
              status: { code: 200, message: 'Logged in successfully' },
              data: AccountSerializer.new(resource).serializable_hash[:data][:attributes]
            }
          end

          def respond_to_on_destroy
            if current_account
              render json: { status: 401, message: "Couldn't find an active session." }, status: :unauthorized
            else
              render json: { status: 200, message: 'Logged out successfully' }, status: :ok
            end
          end

          def authenticate_account!
            if request.headers['Authorization'].present?
              begin
                jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, ENV['DEVISE_JWT_SECRET_KEY']).first
                @current_account = Account.find(jwt_payload['account_id']['$oid'])
              rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
                render json: { error: e.message }, status: :unprocessable_entity
              end
            else
              render json: { error: "Missing 'Authorization' header." }, status: :unprocessable_entity
            end
          end

          def revoke_token(account)
            account.update_attribute(:jti, generate_jti)
          end

          def generate_jti
            SecureRandom.uuid
          end
      end
    end
  end
end
