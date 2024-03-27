Rails.application.routes.draw do
  namespace :api, as: nil do
    namespace :v1, as: nil do
      devise_for :accounts, controllers: { sessions:      'api/v1/auth/sessions',
                                           registrations: 'api/v1/auth/registrations' }
    end
  end

  namespace :api do
    namespace :v1 do
      resources :tasks

      get 'search/tasks'
    end
  end
end
