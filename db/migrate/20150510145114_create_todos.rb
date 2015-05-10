class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :task, null: false
      t.text :description
      t.boolean :complete, default: false
      t.references :user

      t.timestamps
    end
  end
end
