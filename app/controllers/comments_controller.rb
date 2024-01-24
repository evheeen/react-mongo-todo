class CommentsController < ApplicationController
  def create
    @task = Task.find(params[:task_id])
    @comment = @task.comments.build(comment_params)

    if @comment.save
      redirect_to task_path(@task), notice: 'Comment created successfully.'
    else
      redirect_to task_path(@task), alert: @comment.errors.full_messages.join('; ')
    end
  end

  private

    def comment_params
      params.require(:comment).permit(:body).merge(account_id: current_account.id)
    end
end
