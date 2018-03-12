UPDATE users SET name = $2, age = $3, gender = $4
WHERE userid = $1 RETURNING *;