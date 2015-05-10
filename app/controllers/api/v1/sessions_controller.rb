class API::V1::SessionsController < DeviseTokenAuth::ApplicationController
  respond_to :json

  before_filter :set_user_by_token, only: [:destroy]

  def create
    @resource = User.find_by(email: session_params[:email].downcase, provider: 'email')
    if @resource && valid_params?(:email, @resource.email) && @resource.valid_password?(session_params[:password])
      client_id = SecureRandom.urlsafe_base64(nil, false)
      token = SecureRandom.urlsafe_base64(nil, false)

      @resource.tokens[client_id] = {
        token: BCrypt::Password.create(token),
        expiry: (Time.now + DeviseTokenAuth.token_lifespan).to_i
      }
      @resource.save

      sign_in(:user, @resource, store: false, bypass: false)
      respond_with @resource, location: nil
    else
      head :unauthorized
    end
  end

  def destroy
    user = remove_instance_variable(:@resource) if @resource
    client_id = remove_instance_variable(:@client_id) if @client_id
    remove_instance_variable(:@token) if @token

    if user && client_id && user.tokens[client_id]
      user.tokens.delete(client_id)
      user.save!
      head :no_content
    else
      head :not_found
    end
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end

  def valid_params?(key, val)
    session_params[:password] && key && val
  end
end
