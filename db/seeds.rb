User.destroy_all

u = User.new(
email: "apoioceanografico@gmail.com",
username: "ondas",
password: 'cogesn',
)
u.save!

u = User.new(
email: "soutobias.f@gmail.com",
username: "meteorochm",
password: 'marinha1',
)
u.save!
