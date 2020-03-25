class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :queue
  has_many :user_queues
end
