module Api
  module V1
    class SearchController < ApplicationController
      def tasks
        @tasks = current_account.tasks.where(title: /#{params[:q]}/i).or(description: /#{params[:q]}/i).order(created_at: :desc)

        render json: @tasks, include: %i[labels project notes]
      end
    end
  end
end
