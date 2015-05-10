class API::V1::UsersController < DeviseTokenAuth::ApplicationController
  respond_to :json

  before_filter :set_user_by_token, only: [:destroy, :update]
  skip_after_filter :update_auth_header, only: [:create, :destroy]

  def create
    @user = User.new(user_params)
    @user.provider = 'email'
    begin
      if @user.save
        client_id = SecureRandom.urlsafe_base64(nil, false)
        token = SecureRandom.urlsafe_base64(nil, false)

        @user.tokens[@client_id] = {
          token: BCrypt::Password.create(@token),
          expiry: (Time.now + DeviseTokenAuth.token_lifespan).to_i
        }
        @user.save!

        update_auth_header
        respond_with @user, status: :created
      else
        clean_up_passwords @user
        respond_with @user, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotUnique
      clean_up_passwords @user
      respond_with @user, status: :unprocessable_entity
    end
  end

  def update
    if @user
      if @user.update_attributes(user_params)
        respond_with @user
      else
        respond_with @user, status: :unprocessable_entity
      end
    else
      head :not_found
    end
  end

  def destroy
    if @user
      @user.destroy
      head :no_content
    else
      head :not_found
    end
  end

  private

  def user_params
    params.require(:user)
      .permit(:email, :password, :password_confirmation,
              :first_name, :last_name)
  end
end
