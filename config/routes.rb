Rails.application.routes.draw do
  devise_for :users
  get "admin", to: "pages#admin"
  get "teste", to: "pages#teste"

  resources :buoys, only: [:edit, :update]
  resources :websites, only: [:edit, :update]
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
