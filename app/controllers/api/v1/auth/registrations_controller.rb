module Api
  module V1
    module Auth
      class RegistrationsController < Devise::RegistrationsController
        respond_to :json

        protected

          def sign_up_params
            params.require(:account).permit(:email, :password, :password_confirmation, :username)
          end

        private

          def respond_with(resource, _opts = {})
            if resource.persisted?
              render json: { data: AccountSerializer.new(resource).serializable_hash[:data][:attributes],
                             message: 'Signed up sucessfully.' },
                     status: :ok
            else
              render json: { errors: resource.errors.full_messages, message: resource.errors.full_messages.to_sentence },
                     status: :unprocessable_entity
            end
          end
      end
    end
  end
end
