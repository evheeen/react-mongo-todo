module Api
  module V1
    module Auth
      class SessionsController < Devise::SessionsController
        respond_to :json

        skip_before_action :verify_signed_out_user, only: :destroy

        protected

          def sign_in_params
            params.require(:account).permit(:email, :password)
          end

        private

          def respond_with(resource, _opts = {})
            if resource.errors.empty?
              render json: { data: AccountSerializer.new(resource).serializable_hash[:data][:attributes],
                             message: 'Logged in successfully' },
                     status: :ok
            else
              render json: { errors: resource.errors.full_messages, message: resource.errors.full_messages.to_sentence },
                     status: :unprocessable_entity
            end
          end

          def respond_to_on_destroy
            if current_account
              render json: { message: "Couldn't find an active session." }, status: :unauthorized
            else
              render json: { message: 'Logged out successfully' }, status: :ok
            end
          end
      end
    end
  end
end
