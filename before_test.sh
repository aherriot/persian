# drop the test database,
# create a users collection,
# and create an admin user (so we can add and edit words)
mongo persianTest --eval '
  db.dropDatabase(); 
  db.createCollection("users");
  db.users.insert({
    username: "admin", 
    email: "admin@test.com", 
    role: "admin", 
    password: "$2a$10$tcHz5Nl8IHvxhj7zdxhWR.jZPRO52Ftqr5PfGuzBuZdRJX2NX1KgW"
  });'