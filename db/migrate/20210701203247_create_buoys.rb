class CreateBuoys < ActiveRecord::Migration[6.0]
  def change
    create_table :buoys do |t|
      t.string :name
      t.string :buoy_id
      t.timestamps
    end
  end
end
