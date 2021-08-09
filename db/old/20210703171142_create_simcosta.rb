class CreateSimcosta < ActiveRecord::Migration[6.0]
  def change
    create_table :simcosta do |t|

      t.timestamps
    end
  end
end
