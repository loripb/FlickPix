class UserQueueSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :movie_id, :watched
  has_one :user
  has_one :movie
end
