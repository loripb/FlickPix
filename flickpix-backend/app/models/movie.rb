require 'httparty'

class Movie < ApplicationRecord
  include HTTParty
  has_many :user_queues
  has_many :users, through: :user_queues

  default_params :output => 'json'
  format :json

  def self.get_movies
    get("https://api.themoviedb.org/3/search/movie?api_key=3d6fab529007c80701a5d4ed2a0df61e&language=en-US&query=#{['a', 'b', 'd', 'e', 'h', 'i', 'l', 'm', 'n', 'o', 'q', 's', 't', 'v', 'w', 'y', 'z'].sample}&page=#{rand(1..68)}&include_adult=false")
  end
end
