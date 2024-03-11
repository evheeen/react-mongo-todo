Rails.application.routes.draw do
  devise_for :accounts

  namespace :api do
    namespace :v1 do
      resources :tasks

      get 'search/tasks'
    end
  end
end
