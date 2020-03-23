class UserQueuesController < ApplicationController

  def create
    queue = UserQueue.create(queue_params)

    render json: queue.to_json
  end

  def update
    queue = UserQueue.find(params[:id])
    queue.update(queue_params)

    render json: queue.to_json
  end

  def delete
    queue = UserQueue.find(params[:id])
    queue.destroy
  end

  private

  def queue_params
    params.permit(:user_id, :movie_id, :watched)
  end
end
