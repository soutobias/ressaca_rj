class AddColumnToBuoy < ActiveRecord::Migration[6.0]
  def change
    add_column :buoys, :lat, :numeric
    add_column :buoys, :lon, :numeric
  end
end
