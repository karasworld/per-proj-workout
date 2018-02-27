UPDATE users SET name = $2, age = $3, gender = $4, startweight = $5, goalweight = $6, profilepic = $7, startingbodypic = $8
WHERE id = $1 RETURNING *;