class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.integer :movie_id
      t.float :popularity
      t.string :title
      t.string :overview
      t.boolean :adult
      t.string :vote_count
      t.string :video
      t.string :backdrop_path
      t.string :original_language
      t.string :original_title
      t.string :genre_ids
      t.string :vote_average
      t.string :poster_path


      t.timestamps
    end
  end
end
