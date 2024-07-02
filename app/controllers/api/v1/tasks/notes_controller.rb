module Api
  module V1
    module Tasks
      class NotesController < ApplicationController
        before_action :set_note, only: %i[update destroy]
        before_action :set_task, only: %i[create]

        # POST /api/v1/tasks/1/notes
        def create
          @note = @task.notes.new(note_params)

          if @note.save
            render json: @note, include: %i[labels project notes], status: :created
          else
            render json: { errors: @note.errors.full_messages, message: @note.errors.full_messages.to_sentence }, status: :unprocessable_entity
          end
        end

        # PATCH/PUT /api/v1/tasks/1/notes/1
        def update
          if @note.update(note_params)
            render json: @note, include: %i[labels project notes], status: :ok
          else
            render json: { errors: @note.errors.full_messages, message: @note.errors.full_messages.to_sentence }, status: :unprocessable_entity
          end
        end

        # DELETE /api/v1/tasks/1/notes/1
        def destroy
          @note.destroy
        end

        private

          def set_task
            @task = current_account.tasks.find(params[:task_id])
          end

          def set_note
            @note = current_account.notes.find(params[:id])
          end

          def note_params
            params.require(:note).permit(:body)
          end
      end
    end
  end
end
