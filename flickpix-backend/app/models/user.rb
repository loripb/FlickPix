class User < ApplicationRecord
  has_many :user_queues
  has_many :movies, through: :user_queues
  has_secure_password
end
