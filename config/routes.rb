Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: '/auth'
    end
  end

  root 'application#index'
  get '*path' => 'application#index'
end
