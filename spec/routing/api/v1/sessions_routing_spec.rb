require 'rails_helper'

describe 'sessions routes' do
  it 'routes POST create' do
    expect(post: '/api/v1/auth/sign_in').to route_to(
      controller: 'devise_token_auth/sessions',
      action: 'create',
      format: :json
    )
  end

  it 'routes DELETE destroy' do
    expect(delete: '/api/v1/auth/sign_out').to route_to(
      controller: 'devise_token_auth/sessions',
      action: 'destroy',
      format: :json
    )
  end
end
