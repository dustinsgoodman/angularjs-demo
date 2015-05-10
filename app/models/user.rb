class User < ActiveRecord::Base
  devise :database_authenticatable, :recoverable,
         :trackable, :validatable, :registerable,
         :omniauthable

  include DeviseTokenAuth::Concerns::User

  before_validation :set_defaults
  before_save :skip_devise_steps, :sanitize_params

  private

  def set_defaults
    self.uid = SecureRandom.uuid if self.uid.blank?
  end

  def skip_devise_steps
    skip_confirmation!
  end

  def sanitize_params
    self.email = self.email.downcase
    self.provider = 'email' if self.provider.blank?
  end
end
