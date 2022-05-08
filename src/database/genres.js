const db = require("./db");

const Genre = function (genre) {
    this.name = genre.name;
};

//add new genre
Genre.add = async (newGenre, result) => {
    try {
        const output = await db.query("INSERT INTO genres(name) value(?)", [newGenre.name]);

        if (output.affectedRows) {
            result(null, { id: output.insertId, ...newGenre });
            return;
        }
    } catch (err) {
        result(err, null);
        return;
    }
};

//retreive all genres
Genre.getAll = async (name, result) => {
    let query = "SELECT * FROM genres";

    if (name) {
        query += ` WHERE name LIKE '%${name}%'`;
    }
    try {
        const output = await db.query(query);
        result(null, output);
        return;
    } catch (err) {
        result(err, null);
        return;
    }
};

//retreive genre by id
Genre.getById = async (id, result) => {
    try {
        const output = await db.query("SELECT * FROM genres where id = ?",[id]);
        result(null, output);
        return;
    } catch (err) {
        result(err, null);
        return;
    }
};

//get genre id by name 
Genre.getId = async (name) => {
    try {
        const output = await db.query(`SELECT id FROM genres WHERE name LIKE '%${name}%'`);
        return output[0].id;
    } catch (err) {
        console.log(err);
        return;
    }
};

//get genre name by id
Genre.getName = async (id) => {
    try {
        const output = await db.query(`SELECT name FROM genres WHERE id = ?`,[id]);
        return output[0].name;
    } catch (err) {
        console.log(err);
        return;
    }
};

//update genre using id
Genre.updateById = async (id, genre, result) => {
    try {
        const output = await db.query("UPDATE genres SET name = ? WHERE id = ?", [genre.name, id]);

        if (output.affectedRows == 0) {
            result({ type: "not_found" }, null);
            return;
        }

        result(null, { id: id, ...genre });
        return;
    } catch (err) {
        result(err, null);
        return;
    }
};

//delete genre using id
Genre.deleteById = async (id, result) => {
    try {
        const output = await db.query("DELETE FROM genres WHERE id = ?", [id]);
        if (output.affectedRows == 0) {
            result({ type: "not_found" }, null);
            return;
        }
        result(null, output);
        return;
    } catch (err) {
        result(err, null);
        return;
    }
};

module.exports = Genre;