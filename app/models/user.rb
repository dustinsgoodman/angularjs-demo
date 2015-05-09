class User < ActiveRecord::Base
  devise :database_authenticatable, :recoverable,
         :trackable, :validatable, :registerable,
         :omniauthable

  include DeviseTokenAuth::Concerns::User

  before_validation :set_defaults
  before_save -> { skip_confirmation! }

  def set_defaults
    self.provider = 'app'
    self.uid = SecureRandom.uuid if self.uid.blank?
  end
end
