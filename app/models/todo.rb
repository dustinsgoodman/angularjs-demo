class Todo < ActiveRecord::Base
  validates :task, presence: true
  validates :user_id, presence: true

  belongs_to :user
end
