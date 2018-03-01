UPDATE users SET name = $2, age = $3, gender = $4, startweight = $5, goalweight = $6, downloadURL = $7, startingbodypic = $8, email = $9
WHERE id = $1 RETURNING *;