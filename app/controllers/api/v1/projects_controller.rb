module Api
  module V1
    class ProjectsController < ApplicationController
      before_action :set_project, only: %i[show update destroy]

      # GET /api/v1/projects
      def index
        @projects = current_account.projects
        render json: @projects
      end

      # GET /api/v1/projects/1
      def show
        render json: @project
      end

      # POST /api/v1/projects
      def create
        @project = current_account.projects.new(project_params)

        if @project.save
          render json: @project, status: :created, location: api_v1_projects_url(@project)
        else
          render json: { errors: @project.errors.full_messages, message: @project.errors.full_messages.to_sentence }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/projects/1
      def update
        if @project.update(project_params)
          render json: @project, status: :ok
        else
          render json: { errors: @project.errors.full_messages, message: @project.errors.full_messages.to_sentence }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/projects/1
      def destroy
        @project.destroy
      end

      private

        def set_project
          @project = current_account.projects.find(params[:id])
        end

        def project_params
          params.require(:project).permit(:name, :description, :deadline)
        end
    end
  end
end
