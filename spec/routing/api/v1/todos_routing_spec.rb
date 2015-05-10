require 'rails_helper'

describe 'todos routes' do
  it 'routes GET index' do
    expect(get: '/api/v1/todos').to route_to(
      controller: 'api/v1/todos',
      action: 'index',
      format: :json
    )
  end

  it 'routes POST create' do
    expect(post: '/api/v1/todos').to route_to(
      controller: 'api/v1/todos',
      action: 'create',
      format: :json
    )
  end

  it 'routes GET show' do
    expect(get: '/api/v1/todos/1').to route_to(
      controller: 'api/v1/todos',
      action: 'show',
      id: '1',
      format: :json
    )
  end

  it 'routes PUT update' do
    expect(put: '/api/v1/todos/1').to route_to(
      controller: 'api/v1/todos',
      action: 'update',
      id: '1',
      format: :json
    )
  end

  it 'routes DELETE destroy' do
    expect(delete: '/api/v1/todos/1').to route_to(
      controller: 'api/v1/todos',
      action: 'destroy',
      id: '1',
      format: :json
    )
  end
end
