require 'httparty'

class User < ApplicationRecord
  include HTTParty
  has_many :user_queues
  has_many :movies, through: :user_queues
  has_secure_password
  # validates :uniqueness
  default_params :output => 'json'
  format :json

end
