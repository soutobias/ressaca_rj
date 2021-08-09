class WebsitesController < ApplicationController
  before_action :set_website, only: [:update]

  def update
    @website.update(website_params)
    redirect_to admin_path
  end

  private

  def set_website
    @website = Website.find(params[:id])
  end

  def website_params
    params.require(:website).permit(:title, :text, :photo)
  end
end
