class MovieSerializer < ActiveModel::Serializer
  attributes :id, :movie_id, :popularity, :title, :overview, :adult, :poster_path
end
