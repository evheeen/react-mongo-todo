module Api
  module V1
    class TasksController < ApplicationController
      before_action :set_task, only: %i[show update destroy]

      # GET /api/v1/tasks
      def index
        @tasks = current_account.tasks
        render json: @tasks, include: [:labels, :project, :notes]
      end

      # GET /tasks/1
      def show
        render json: @task, include: [:labels, :project, :notes]
      end

      # POST /tasks
      def create
        @task = current_account.tasks.new(task_params)

        if @task.save
          render json: @task, include: [:labels, :project, :notes], status: :created, location: api_v1_tasks_url(@task)
        else
          render json: { errors: @task.errors.full_messages, message: @task.errors.full_messages.to_sentence }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /tasks/1
      def update
        if @task.update(task_params)
          render json: @task, include: [:labels, :project, :notes], status: :ok
        else
          render json: { errors: @task.errors.full_messages, message: @task.errors.full_messages.to_sentence }, status: :unprocessable_entity
        end
      end

      # DELETE /tasks/1
      def destroy
        @task.destroy
      end

      private

        def set_task
          @task = current_account.tasks.find(params[:id])
        end

        def task_params
          params.require(:task).permit(:title, :description, :due_date, :status, :priority, :project_id, label_ids: [])
        end
    end
  end
end
