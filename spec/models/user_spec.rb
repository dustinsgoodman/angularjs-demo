require 'rails_helper'

describe User do
  it 'has a valid factory' do
    FactoryGirl.build_stubbed(:user).should be_valid
  end

  it 'should always have a downcased email' do
    email = 'ABC@HI.COM'
    user = FactoryGirl.create(:user, email: email)
    user.email.should eq email.downcase
  end

  it 'should set provider to email if unset' do
    user = FactoryGirl.create(:user)
    user.provider.should eq 'email'
  end
end
