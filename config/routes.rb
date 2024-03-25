Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :auth do
        devise_for :accounts, controllers: { sessions:      'api/v1/auth/sessions',
                                             registrations: 'api/v1/auth/registrations' }
      end

      resources :tasks

      get 'search/tasks'
    end
  end
end
