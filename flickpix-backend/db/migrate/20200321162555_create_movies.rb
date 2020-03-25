class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.integer :movie_id
      t.float :popularity
      t.string :title
      t.string :overview
      t.boolean :adult
      t.string :poster_path

      t.timestamps
    end
  end
end
