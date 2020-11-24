class DadosController < ApplicationController
  before_action :api_spotter, only: [:index]

	def index
    @values = api_spotter()


    @data = {
      labels: @values[:timestamp],
      datasets: [
        {
            label: "My First dataset",
            backgroundColor: "rgba(220,220,220,0.2)",
            borderColor: "rgba(220,220,220,1)",
            data: @values[:significantwaveheight]
        },
        {
            label: "My Second dataset",
            backgroundColor: "rgba(151,187,205,0.2)",
            borderColor: "rgba(151,187,205,1)",
            data: @values[:meanperiod]
        }
      ]
    }

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
