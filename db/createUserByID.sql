INSERT INTO users (userid, name, age, gender, startweight, goalweight, downloadURL, startingbodypic, email)
VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9 );
SELECT * FROM users WHERE userid = $1;