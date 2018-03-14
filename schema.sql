CREATE TABLE users(
    id serial primary key autoincrement,
    name varchar(40),
    age varchar(3),
    gender text,
    start weight varchar(4),
    goal weight varchar(3),
    profile pic text,
    starting body pic text,
    userid text,
    email text
);

CREATE TABLE routine(
    exidprime serial,
    exerciseid int NOT NULL,
    exercisename varchar(25),
    id int,
    PRIMARY KEY (exidprime),
    FOREIGN KEY (id) REFERENCES users(id)
);