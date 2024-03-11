class Api::V1::SearchController < ApplicationController
  def tasks
    @tasks = Task.where(title: /#{params[:q]}/i).or(description: /#{params[:q]}/i).order(created_at: :desc)

    render json: @tasks
  end
end
