require 'rails_helper'

describe 'auth routes' do
  it 'routes POST sign_in' do
    expect(post: '/api/v1/auth/sign_in').to route_to(
      controller: 'devise_token_auth/sessions',
      action: 'create',
      format: :json
    )
  end
end
