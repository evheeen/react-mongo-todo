module Api
  module V1
    class TasksController < ApplicationController
      skip_before_action :verify_authenticity_token

      before_action :set_task, only: %i[show update destroy]

      protect_from_forgery except: %i[create update]

      # GET /api/v1/tasks
      def index
        @tasks = Task.all
        render json: @tasks
      end

      # GET /tasks/1
      def show
        render json: @task
      end

      # POST /tasks
      def create
        @task = Task.new(task_params)

        if @task.save
          render json: @task, status: :created, location: api_v1_tasks_url(@task)
        else
          render json: @task.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /tasks/1
      def update
        if @task.update(task_params)
          render json: @task
        else
          render json: @task.errors, status: :unprocessable_entity
        end
      end

      # DELETE /tasks/1
      def destroy
        @task.destroy
      end

      private

        def set_task
          @task = Task.find(params[:id])
        end

        def task_params
          params.require(:task).permit(:title, :description, :due_date, :status, :priority, :project_id, label_ids: [])
        end
    end
  end
end
