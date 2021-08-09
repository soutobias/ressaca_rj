require 'open-uri'


User.destroy_all
Buoy.destroy_all

u = User.new(
  email: "1@gmail.com",
  username: "ressaca",
  password: 'copacabana',
  admin: false
)
u.save!

u = User.new(
  email: "soutobias.f@gmail.com",
  username: "meteorochm",
  password: 'marinha1',
  admin: true
)
u.save!


b = Buoy.new(
  name: "ezwave",
  buoy_id: 21,
  lat: -22.978863684973625,
  lon: -43.175209075967835
)
file = URI.open('app/assets/images/ezwave.png')
b.photo.attach(io: file, filename: "1.png", content_type: 'image/png')
b.save!


b = Buoy.new(
  name: "spotter",
  buoy_id: 2,
  lat: -22.97386528134753,
  lon: -43.16672130120239
)
file = URI.open('app/assets/images/spot_buoy.png')
b.photo.attach(io: file, filename: "1.png", content_type: 'image/png')
b.save!


b = Buoy.new(
  name: "wkb_rj3",
  buoy_id: 897,
  lat: -22.9831,
  lon: -43.1745
)
file = URI.open('app/assets/images/wkb.png')
b.photo.attach(io: file, filename: "1.png", content_type: 'image/png')
b.save!


b = Buoy.new(
  name: "wkb_rj4",
  buoy_id: 900,
  lat: -22.9715,
  lon: -43.1522
)

file = URI.open('app/assets/images/wkb.png')
b.photo.attach(io: file, filename: "1.png", content_type: 'image/png')
b.save!


w = Website.new(
  title: 'TESTE COM SISTEMA DE ONDAS',
  word: 'Este teste com equipamentos é proveniente de um acordo de Cooperação entre o Centro de Hidrografia da Marinha e a empresa Petróleo Brasileiro S.A. (PETROBRAS) e de uma parceria do projeto PNBOIA com o projeto SiMCosta.

Um agradecimento à PETROBRAS e à Agência Nacional do Petróleo (ANP) por tornarem possíveis os trabalhos de campo, por meio dos Termos de Cooperação SIGITEC 2018/00206-1 e 2018/00207-8.',
)
file = URI.open('app/assets/images/banner.jpg')
w.photo.attach(io: file, filename: "1.jpg", content_type: 'image/jpg')
w.save!

