require 'httparty'

class Movie < ApplicationRecord
  include HTTParty
  has_many :user_queues
  has_many :users, through: :user_queues

  default_params :output => 'json'
  format :json

  def self.get_movies
    get("https://api.themoviedb.org/3/search/movie?api_key=3d6fab529007c80701a5d4ed2a0df61e&language=en-US&query=a&page=#{rand(1..285)}&include_adult=false")
  end
end
