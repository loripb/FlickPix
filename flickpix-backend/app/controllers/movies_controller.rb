class MoviesController < ApplicationController
  def index
    @movies = Movie.all

    render json: @movies
  end

  def api
    @movies = Movie.get_movies

    render json: @movies.to_json
  end

  def create
    @movie = Movie.create(movie_params)

    render json: @movie
  end

  private

  def movie_params
    params.permit(:movie_id, :popularity, :title, :overview, :adult, :poster_path)
  end

end
