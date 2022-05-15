import pool from '../db/queries.js';
import bcrypt from 'bcryptjs';

// {
//   "firstName": "Du",
//   "middleName": "Thi",
//   "lastName": "Nguyen",
//   "email": "nguyenthidu@gmail.com",
//   "password": "123123"
// }

// Create a new user
const create = async (req, res) => {
  try {
    // Create user
    const { firstName, middleName, lastName, email, password } = req.body;

    const { rows } = await pool.query(
      'INSERT INTO users (first_name, middle_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [
        firstName,
        middleName,
        lastName,
        email,
        bcrypt.hashSync(password, process.env.BCRYPTJS_SALT),
      ]
    );
    const user = rows[0];

    // Create one and only one root for the user
    await pool.query(
      'INSERT INTO folders (user_id, parent_id, name) VALUES ($1, $2, $3)',
      [user.id, null, 'root']
    );

    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// Remove a current user
const removeById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // A user may have many folders, whose user_id is the user's id.
    // A folder may have many files, whose folder_id is the folder's id
    // Remove files -> remove folders -> remove user

    // Remove all files belongs to that users
    await pool.query(
      'DELETE FROM files as fi WHERE fi.folder_id IN (SELECT DISTINCT(id) FROM folders AS fo WHERE fo.user_id = $1);',
      [id]
    );

    // Remove all folders belongs to that users
    await pool.query('DELETE FROM folders as f WHERE f.user_id = $1;', [id]);

    // Remove the user
    const {
      rows: [user],
    } = await pool.query(
      'DELETE FROM users as u WHERE u.id = $1 RETURNING *;',
      [id]
    );

    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// Update a user
// [TODO]
const updateById = async (req, res) => {};

// Fetch all users
const getAll = async (req, res) => {
  try {
    const text = 'SELECT * FROM users;';

    const { rows } = await pool.query(text);

    res.status(200).send(rows);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// Fetch a user by id
const getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const text = 'SELECT * FROM users AS u where u.id = $1';
    const values = [id];
    const {
      rows: [user],
    } = await pool.query(text, values);

    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const User = {
  getAll,
  getById,
  create,
  removeById,
  updateById,
};

export default User;
