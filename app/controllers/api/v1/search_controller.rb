module Api
  module V1
    class SearchController < ApplicationController
      before_action :authenticate_account!

      def tasks
        @tasks = Task.where(title: /#{params[:q]}/i).or(description: /#{params[:q]}/i).order(created_at: :desc)

        render json: @tasks
      end
    end
  end
end
