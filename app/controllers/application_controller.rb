class ApplicationController < ActionController::Base
  respond_to :html

  include ActionController::MimeResponds
  include DeviseTokenAuth::Concerns::SetUserByToken

  protect_from_forgery unless: -> { request.format.json? }

  def index
  end
end
