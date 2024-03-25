class ApplicationController < ActionController::Base
  respond_to :json

  before_action :authenticate_account!

  alias_method :current_account,       :current_api_v1_account
  alias_method :authenticate_account!, :authenticate_api_v1_account!
end
