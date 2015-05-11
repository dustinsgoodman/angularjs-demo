require 'rails_helper'

describe Todo do
  it 'has a valid factory' do
    FactoryGirl.build_stubbed(:todo).should be_valid
  end

  it 'is invalid without a task' do
    FactoryGirl.build(:todo, task: nil).should_not be_valid
  end

  it 'is invalid without a user' do
    FactoryGirl.build(:todo, user: nil).should_not be_valid
  end
end
