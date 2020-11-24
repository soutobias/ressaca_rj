class DadosController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :index ]

	def index
    @values = api_spotter()
	end

  private

  def api_spotter

    response = RestClient.get('https://api.sofarocean.com/api/wave-data?spotterId=SPOT-0222&token=bd4f226b8e3249c5c5015254363f68&includeWindData=true')
    spotter_response = JSON.parse(response)
    significantwaveheight = []
    peakperiod = []
    meanperiod = []
    peakdirection =[]
    timestamp =[]
    latitude = []
    longitude =[]
    wind_speed = []
    wind_direction = []
    

    spotter_response["data"]["waves"].each do |item|
      significantwaveheight << item["significantWaveHeight"]
      peakperiod << item["peakPeriod"]
      meanperiod << item["meanPeriod"]
      peakdirection << item["peakDirection"]
      x = item["timestamp"]
      date_time = DateTime.parse x
      timestamp << date_time.strftime("%Y-%m-%d %H:%M:%S")
      latitude << item["latitude"]
      longitude << item["longitude"]
    end

    spotter_response["data"]["wind"].each do |item|
      wind_speed << item["speed"]
      wind_direction << item["direction"]
    end

    params = {}
    params[:significantwaveheight] = significantwaveheight
    params[:peakperiod] = peakperiod
    params[:meanperiod] = meanperiod
    params[:peakdirection] = peakdirection
    params[:timestamp] = timestamp
    params[:latitude] = latitude
    params[:longitude] = longitude
    params[:wind_speed] = wind_speed
    params[:wind_direction] = wind_direction
    
    params = params.to_h

  end
end
