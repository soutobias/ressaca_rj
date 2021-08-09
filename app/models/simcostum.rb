class Simcostum < ActiveRecord::Base
  establish_connection :external
  self.table_name = "data_stations"
end


