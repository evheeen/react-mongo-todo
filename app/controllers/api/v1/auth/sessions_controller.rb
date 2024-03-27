class Api::V1::Auth::SessionsController < Devise::SessionsController
  respond_to :json

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

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
end
