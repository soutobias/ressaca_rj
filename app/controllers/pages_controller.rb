class PagesController < ApplicationController


  def admin
    @buoys = Buoy.all
    @website = Website.first
  end

  def teste
  end

  def home
    start_date = (Time.now - 5.day)
    end_date = (Time.now + 1.day)

    @website = Website.first
    @spotter = Buoy.where("name = 'wkb_rj3'")[0]
    @ezwave = Buoy.where("name = 'ezwave'")[0]

    # @spotter = Buoy.where("name = 'spotter'")[0]

    @simcosta = Buoy.where("name = 'wkb_rj4'")[0]

    @simcosta_data = get_simcosta(@simcosta, start_date, end_date)

    # @simcosta_meteo = get_simcosta_meteo(@simcosta, start_date, end_date)
    # @simcosta_ocean = get_simcosta_ocean(@simcosta, start_date, end_date)
    # @spotter_data = get_remobs(@spotter, start_date, end_date)

    @spotter_data = get_simcosta(@spotter, start_date, end_date)
    @ezwave_data = get_remobs(@ezwave, start_date, end_date)

    @buoys = [@simcosta, @spotter, @ezwave]

    image = 'https://www.marinha.mil.br/chm/sites/www.marinha.mil.br.chm/files/figuras/ww3/'
    @images = {}
    @images[:image] = []
    @images[:idx] = []
    (0..30).to_a.each_with_index do |value, idx|
      @images[:image] << "#{image}ondas_#{(value*3).to_s.rjust(3, '0')}_3.gif"
      @images[:idx] << idx
    end
  end

  private

  def get_buoys(buoy)
    response = RestClient.get("http://143.198.233.67/api/v1/buoys")
    spotter_response = JSON.parse(response)
    params = {}
    params[:model] = []
    params[:lat] = []
    params[:lon] = []
    params[:buoy_id] = []
    params[:buoy_name] = []
    params[:position] = []

    spotter_response.each do |item|
      if item['id'].to_i == buoy.buoy_id.to_i
        params[:model] << item['model']
        params[:lat] << item['lat']
        params[:lon] << item['lon']
        params[:position] << Geo::Coord.new(lat: item['lat'], lng: item['lon'])
        params[:buoy_id] << item['id']
        params[:buoy_name] << item['buoy_name']
      end
    end

    return params
  end

  def get_simcosta(simcosta, start_date, end_date)

    start_date = start_date.strftime('%Y-%m-%dT%H:%M:%S')
    end_date = end_date.strftime('%Y-%m-%dT%H:%M:%S')

    values = Simcostum.where("date_time > '#{start_date}' AND date_time < '#{end_date}' and station_id = #{simcosta.buoy_id}").order(:date_time)
    params = {}

    params[:swvht] = []
    params[:mxwvht] = []
    params[:tp] = []
    params[:sst] = []
    params[:wvspread] = []
    params[:wvdir] = []
    params[:wvdirg] = []
    params[:wdirg] = []
    params[:date_time] = []
    params[:wspd] = []
    params[:wdir] = []
    params[:gust] = []

    values.each do |item|
      params[:swvht] << item.swvht
      params[:mxwvht] << item.mxwvht
      params[:tp] << item.tp
      params[:sst] << item.sst
      params[:wvspread] << item.wvspread
      params[:wvdir] << item.wvdir.to_i
      params[:wvdirg] << (item.wvdir.to_i/10)*10
      begin
        params[:wspd] << (item.wspd * 0.51444).round(2)
        params[:wdir] << item.wdir.to_i
        params[:wdirg] << (item.wdir.to_i/10)*10
        params[:gust] << item.gust
      rescue
        params[:wspd] << nil
        params[:wdir] << nil
        params[:wdirg] << nil
        params[:gust] << nil
      end
      params[:date_time] << item.date_time
    end

    return params
  end

  def get_remobs(buoy, start_date, end_date)

    response = RestClient.get("http://143.198.233.67/api/v1/data_buoys?buoy=#{buoy.buoy_id.to_i}&start_date=#{start_date.strftime("%Y-%m-%d")}&end_date=#{end_date.strftime("%Y-%m-%d")}&token=#{ENV["REMOBS_TOKEN"]}")

    remobs_response = JSON.parse(response)

    params = {}
    params[:swvht] = []
    params[:mxwvht] = []
    params[:tp] = []
    params[:sst] = []
    params[:wvspread] = []
    params[:wvdir] = []
    params[:date_time] = []
    params[:buoy_id] = []
    params[:wspd] = []
    params[:wdir] = []
    params[:gust] = []
    params[:wvdirg] = []
    params[:wdirg] = []

    remobs_response.each do |item|
      params[:buoy_id] << item['buoy_id']

      if item['flag_swvht'].to_i > 0
        params[:swvht] << nil
      else
        params[:swvht] << item['swvht1'].to_f
      end

      if item['flag_mxwvht'].to_i > 0
        params[:mxwwvht] << nil
      else
        params[:mxwvht] << item['mxwvht1'].to_f
      end

      if item['flag_tp'].to_i > 0
        params[:tp] << nil
      else
        params[:tp] << item['tp1'].to_f
      end

      if item['flag_sst'].to_i > 0
        params[:sst] << nil
      else
        params[:sst] << item['sst'].to_f
      end

      if item['flag_wvspread'].to_i > 0
        params[:wvspread] << nil
      else
        params[:wvspread] << item['wvspread1'].to_f
      end

      params[:date_time] << Time.parse(item['date_time'])

      if item['flag_wdir'].to_i > 0
        params[:wdir] << nil
      else
        params[:wdir] << item['wdir'].to_i
      end

      if item['flag_wdir'].to_i > 0
        params[:wdirg] << nil
      else
        params[:wdirg] << (item['wdir'].to_i/10)*10
      end

      if item['flag_gust'].to_i > 0
        params[:gust] << nil
      else
        params[:gust] << item['gust'].to_f
      end

      if item['flag_wspd'].to_i > 0
        params[:wspd] << nil
      else
        params[:wspd] << item['wspd'].to_f
      end

      if item['flag_wvdir'].to_i > 0
        params[:wvdir] << nil
      else
        params[:wvdir] << item['wvdir1'].to_f
      end

      if item['flag_wvdir'].to_i > 0
        params[:wvdirg] << nil
      else
        params[:wvdirg] << (item['wvdir1'].to_i/10)*10
      end
    end

    return params
  end


  def get_simcosta_ocean(simcosta, start_date, end_date)
    response = RestClient.get("https://simcosta.furg.br/api/oceanic_data?boiaID=#{simcosta.buoy_id}&type=json&time1=#{start_date.to_i}&time2=#{end_date.to_i}&params=Hsig_Significant_Wave_Height_m,Mean_Wave_Direction_deg,Hmax_Maximum_Wave_Height_m,Mean_Spread_deg,TP_Peak_Period_seconds,Average_Salinity,Average_Temperature_deg_C")

    simcosta_response = JSON.parse(response)

    params = {}

    params[:swvht] = []
    params[:mxwvht] = []
    params[:tp] = []
    params[:sst] = []
    params[:wvspread] = []
    params[:wvdir] = []
    params[:YEAR] = []
    params[:MONTH] = []
    params[:DAY] = []
    params[:HOUR] = []
    params[:MINUTE] = []
    params[:SECOND] = []
    params[:date_time] = []

    simcosta_response.each do |item|
      params[:swvht] << item['Hsig'].to_f
      params[:mxwvht] << item['Hmax'].to_f
      params[:tp] << item['TP'].to_f
      params[:sst] << item['Avg_W_Tmp1'].to_f
      params[:wvspread] << item['Avg_Spre_N'].to_f
      params[:wvdir] << item['Avg_Wv_Dir_N'].to_f
      params[:YEAR] << item['YEAR']
      params[:MONTH] << item['MONTH']
      params[:DAY] << item['DAY']
      params[:HOUR] << item['HOUR']
      params[:MINUTE] << item['MINUTE']
      params[:SECOND] << item['SECOND']
      params[:date_time] << Time.new(item['YEAR'], item['MONTH'], item['DAY'], item['HOUR'], item['MINUTE'], item['SECOND'])
    end

    return params
  end

  def get_simcosta_meteo(simcosta, start_date, end_date)

    response = RestClient.get("https://simcosta.furg.br/api/metereo_data?boiaID=#{simcosta.buoy_id}&type=json&time1=#{start_date.to_i}&time2=#{end_date.to_i}&params=Average_wind_direction_N,Last_sampling_interval_gust_speed,Average_Dew_Point,Average_Pressure,Solar_Radiation_Average_Reading,Average_Air_Temperature,Instantaneous_Humidity,Average_Humidity,Average_wind_speed")

    simcosta_response = JSON.parse(response)
    params = {}

    params[:wspd] = []
    params[:wdir] = []
    params[:gust] = []
    params[:YEAR] = []
    params[:MONTH] = []
    params[:DAY] = []
    params[:HOUR] = []
    params[:MINUTE] = []
    params[:SECOND] = []
    params[:date_time] = []

    simcosta_response.each do |item|
      params[:wspd] << item['Avg_Wnd_Sp'].to_f
      params[:wdir] << item['Avg_Wnd_Dir_N'].to_f
      params[:gust] << item['Gust_Sp'].to_f
      params[:YEAR] << item['YEAR']
      params[:MONTH] << item['MONTH']
      params[:DAY] << item['DAY']
      params[:HOUR] << item['HOUR']
      params[:MINUTE] << item['MINUTE']
      params[:SECOND] << item['SECOND']
      params[:date_time] << Time.new(item['YEAR'], item['MONTH'], item['DAY'], item['HOUR'], item['MINUTE'], item['SECOND'])
    end

    return params
  end
end

