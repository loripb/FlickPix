class MoviesController < ApplicationController
  def index
    movies = Movie.get_movies
    users  = User.all

    info = {
      movies: movies,
      users:  users,
      queues: users.map do |user|
        user.user_queues
      end
    }

    render json: info.to_json
  end
end
