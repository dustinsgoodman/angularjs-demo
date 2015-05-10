require 'rails_helper'

describe 'users routes' do
  it 'routes POST create' do
    expect(post: '/api/v1/auth').to route_to(
      controller: 'api/v1/users',
      action: 'create',
      format: :json
    )
  end

  it 'routes PUT update' do
    expect(put: '/api/v1/auth').to route_to(
      controller: 'api/v1/users',
      action: 'update',
      format: :json
    )
  end

  it 'routes DELETE destroy' do
    expect(delete: '/api/v1/auth').to route_to(
      controller: 'api/v1/users',
      action: 'destroy',
      format: :json
    )
  end
end
