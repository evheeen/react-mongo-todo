class TasksController < ApplicationController
  before_action :set_task, only: %i[show edit update destroy]

  def index
    @tasks = current_account.tasks.includes(:project).order_by(due_date: 1)
  end

  def show
    @notes = @task.notes
    @note  = Note.new
  end

  def new
    @task = current_account.tasks.new
  end

  def create
    @task = current_account.tasks.new(task_params)
    if @task.save
      manage_labels(@task)
      redirect_to @task, notice: 'Task was successfully created.'
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @task.update(task_params)
      manage_labels(@task)
      redirect_to @task, notice: 'Task was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @task.destroy
    redirect_to tasks_url, notice: 'Task was successfully destroyed.'
  end

  private

    def set_task
      @task = Task.find(params[:id])
    end

    def task_params
      params.require(:task).permit(:title, :description, :due_date, :status, :priority, :account_id, :project_id)
    end

    def manage_labels(task)
      return task.set(labels: []) if params[:task][:label_ids].nil?
      
      task.labels = current_account.labels.in(id: params[:task][:label_ids])
    end
end
