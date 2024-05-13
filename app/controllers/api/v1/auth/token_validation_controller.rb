module Api
  module V1
    module Auth
      class TokenValidationController < ApplicationController
        respond_to :json

        skip_before_action :authenticate_account!

        def validate
          if refresh_token?
            refresh_token = request.headers['Authorization'].split(' ').last

            begin
              warden.authenticate!(scope: :account, recall: false, &:valid?)
              render json: { success: true }, status: :ok
            rescue JWT::DecodeError, Mongoid::Errors::DocumentNotFound => e
              render json: { error: e.message }, status: :unauthorized
            rescue StandardError => e
              render json: { error: 'An unexpected error occurred.' }, status: :internal_server_error
            end
          else
            render json: { error: "Missing 'Authorization' header." }, status: :unauthorized
          end
        end

        private

          def refresh_token?
            request.headers['Authorization'].present?
          end
      end
    end
  end
end
