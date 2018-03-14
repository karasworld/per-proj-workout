INSERT INTO routine (exerciseid, exercisename, id)
VALUES ($1, $2, $3);

SELECT * FROM routine WHERE exerciseid = $1;