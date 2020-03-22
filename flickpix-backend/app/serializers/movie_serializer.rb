class MovieSerializer < ActiveModel::Serializer
  attributes :id, :popularity, :title, :overview, :adult, :poster_path
end
