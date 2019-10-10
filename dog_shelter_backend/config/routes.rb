Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :dogs, only: [:index,:show, :update, :create, :destroy]
      resources :events, only: [:index,:show, :update, :create, :destroy]
    end
  end

end
