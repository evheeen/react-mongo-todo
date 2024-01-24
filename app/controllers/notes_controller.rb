class NotesController < ApplicationController
  def create
    @task = Task.find(params[:task_id])
    @note = @task.notes.build(note_params)

    if @note.save
      redirect_to task_path(@task), notice: 'Note created successfully.'
    else
      redirect_to task_path(@task), alert: @note.errors.full_messages.join('; ')
    end
  end

  private

    def note_params
      params.require(:note).permit(:body)
    end
end
