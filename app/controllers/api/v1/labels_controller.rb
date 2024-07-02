module Api
  module V1
    class LabelsController < ApplicationController
      before_action :set_label, only: %i[show update destroy]

      # GET /api/v1/labels
      def index
        @labels = current_account.labels
        render json: @labels
      end

      # GET /api/v1/labels/1
      def show
        render json: @label
      end

      # POST /api/v1/labels
      def create
        @label = current_account.labels.new(label_params)

        if @label.save
          render json: @label, status: :created, location: api_v1_labels_url(@label)
        else
          render json: { errors: @label.errors.full_messages, message: @label.errors.full_messages.to_sentence }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/labels/1
      def update
        if @label.update(label_params)
          render json: @label, status: :ok
        else
          render json: { errors: @label.errors.full_messages, message: @label.errors.full_messages.to_sentence }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/labels/1
      def destroy
        @label.destroy
      end

      private

        def set_label
          @label = current_account.labels.find(params[:id])
        end

        def label_params
          params.require(:label).permit(:name)
        end
    end
  end
end
