require 'rails_helper'

describe API::V1::TodosController do
  let(:user) { FactoryGirl.create :user }
  let(:user_todos) { FactoryGirl.create_list :todo, 5, user_id: user.id }
  let(:todo) { FactoryGirl.create :todo, user_id: user.id + 1 }

  before { sign_in(user) }

  describe 'GET #index' do
    it 'assigns user\'s todos to @todos' do
      get :index
      expect(assigns(:todos)).to eq(user_todos)
    end
  end
end

