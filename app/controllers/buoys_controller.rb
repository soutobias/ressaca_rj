class BuoysController < ApplicationController
  before_action :set_buoy, only: [:update]

  def update
    @buoy.update(buoy_params)
    redirect_to admin_path
  end

  private

  def set_buoy
    @buoy = Buoy.find(params[:id])
  end

  def buoy_params
    params.require(:buoy).permit(:name, :buoy_id, :lat, :lon, :photo)
  end
end
