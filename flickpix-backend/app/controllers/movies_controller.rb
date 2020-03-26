class MoviesController < ApplicationController
  def index
    @movies = Movie.all

    render json: @movies
  end

  def show
    @movie = Movie.find(params[:id])

    render json: @movie
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
    params.permit(:movie_id, :popularity, :title, :overview, :adult, :poster_path, :video, :vote_count, :backdrop_path, :original_language, :original_title, :genre_ids, :vote_average, :user_queue)
  end

end
