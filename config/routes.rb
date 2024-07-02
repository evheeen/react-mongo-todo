Rails.application.routes.draw do
  namespace :api, as: nil do
    namespace :v1, as: nil do
      devise_for :accounts, controllers: { sessions:      'api/v1/auth/sessions',
                                           registrations: 'api/v1/auth/registrations' }

      post 'validate_token', to: 'auth/token_validation#validate'
    end
  end

  namespace :api do
    namespace :v1 do
      resources :tasks, except: %i[new edit] do
        resources :notes, only: %i[create update destroy], module: :tasks
      end
      resources :projects, except: %i[new edit]
      resources :labels,   except: %i[new edit]

      get 'search/tasks'
    end
  end
end
