require 'httparty'

class User < ApplicationRecord
  include HTTParty
  has_many :user_queues
  has_many :movies, through: :user_queues
  has_secure_password
  # validates :uniqueness
  default_params :output => 'json'
  format :json

  def queue
    q = self.user_queues

    q.map do |u_q|
      get("https://api.themoviedb.org/3/movie/#{u_q.movie_id}?api_key=3d6fab529007c80701a5d4ed2a0df61e")
    end
    byebug
  end
end
