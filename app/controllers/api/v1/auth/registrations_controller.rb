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
              render json: {
                status: { code: 200, message: 'Signed up sucessfully.' },
                data: AccountSerializer.new(resource).serializable_hash[:data][:attributes]
              }
            else
              render json: {
                status: { code: 422, message: "Account couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" }
              }, status: :unprocessable_entity
            end
          end
      end
    end
  end
end
