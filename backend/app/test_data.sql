-- DELETE FROM USERS;
-- INSERT INTO users (email, password) VALUES ("admin@email.com", "7923ee77bd9907cf909c8168948c3d837f7924229127fe01ecb9e1f1fc2d4bb226799968c26dce308701d72d5a6d212ef1eb149990b3ce721ec2998273458c515e0d62f92fe20f16bb48eb1945d804e45e60c5e9274077ea8c41c1c75fb867d1");
-- INSERT INTO users (email, password) VALUES ("guest@email.com", "385ec694b0c0a984457e7a38efd6dcd5f77090e21361b6cd40d693d23417191de2fa33c7a5f29a77d6d1bd0323db63ac3475966277d234441c16617912f632cd9ef11caf24697d6151530ddaecc3b6efa418cd3ac68f4e2448a0a8aa9128ef1c");

DELETE FROM incidents;
INSERT INTO incidents (title, description) VALUES ("incident 1", "incident 1. incident 1. incident 1. incident 1. incident 1. ");
INSERT INTO incidents (title, description) VALUES ("incident 2", "incident 2. incident 2. incident 2. incident 2. incident 2. ");
INSERT INTO incidents (title, description) VALUES ("incident 3", "incident 3. incident 3. incident 3. incident 3. incident 3. ");

DELETE FROM scenes;
INSERT INTO scenes (title, description, lat, lon) VALUES ("scene 1 title", "scene 1 description", 100.2, 53.7);
INSERT INTO scenes (title, description, lat, lon) VALUES ("scene 2 title", "scene 2 description", 43.0, 12.3);
INSERT INTO scenes (title, description, lat, lon) VALUES ("scene 3 title", "scene 3 description", 14.0, 87.41);
INSERT INTO scenes (title, description, lat, lon) VALUES ("scene 4 title", "scene 4 description", 19.1, 32.1);

DELETE FROM actors;
INSERT INTO actors (name, pnumber, birth, height, sex) VALUES ("actor 1", "197001011499", "1970-01-01 10:20:00", 180, "M");
INSERT INTO actors (name, pnumber, birth, height, sex) VALUES ("actor 2", "197001011499", "1970-01-01 10:20:00", 170, "M");
INSERT INTO actors (name, pnumber, birth, height, sex) VALUES ("actor 3", "197001011499", "1970-01-01 10:20:00", 181, "M");
INSERT INTO actors (name, pnumber, birth, height, sex) VALUES ("actor 4", "197001011499", "1970-01-01 10:20:00", 176, "M");
INSERT INTO actors (name, pnumber, birth, height, sex) VALUES ("actor 5", "197001011499", "1970-01-01 10:20:00", 183, "M");

DELETE FROM props;
INSERT INTO props (name, description) VALUES ("knife", "bloody and sharp");
INSERT INTO props (name, description) VALUES ("gun", "colt 1911");
INSERT INTO props (name, description) VALUES ("car", "fast and dented");
INSERT INTO props (name, description) VALUES ("broken bottle", "bloody and sharp");
INSERT INTO props (name, description) VALUES ("banana", "yes it is possible");
