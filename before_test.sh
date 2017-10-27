mongo persianTest --eval 'db.dropDatabase()'
mongo persianTest --eval 'db.createCollection("users")'
mongo persianTest --eval 'db.users.insert({username: "admin", email: "admin@test.com", role: "admin", password: "$2a$10$tcHz5Nl8IHvxhj7zdxhWR.jZPRO52Ftqr5PfGuzBuZdRJX2NX1KgW"})'
