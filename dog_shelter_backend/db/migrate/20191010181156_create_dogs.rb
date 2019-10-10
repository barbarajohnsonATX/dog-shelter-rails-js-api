class CreateDogs < ActiveRecord::Migration[5.2]
  def change
    create_table :dogs do |t|
      t.string :name
      t.string :sex
      t.integer :age
      t.text :description
      t.string :status
      t.timestamps
    end
  end
end
