import pool from '../db/queries.js';

// Create a folder under a parent folder by id
const createAtParentFolderId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userId = parseInt(req.params.userId);
    const { name } = req.body;

    const {
      rows: [folder],
    } = await pool.query(
      'INSERT INTO folders (user_id, parent_id, name) VALUES ($1, $2, $3) RETURNING *;',
      [userId, id, name]
    );

    res.status(200).send(folder);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// Remove a folder by id under a parent folder id
const removeAtParentFolderIdById = async (req, res) => {
  try {
    // A folder may have many subfolders
    // A subfolder may have many other subfolders
    // A folder / subfolder may have many files

    // Find all subordinates of the the folder
    // Delete all files that are included in each of these subordinates.
    // Delete all these subordinates and itself.

    // [TODO]
    const id = parseInt(req.params.id);
    const userId = parseInt(req.params.userId);
    const { name } = req.body;

    res.status(200).send('Not yet');
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// Fetch all files and folders under root
const getFilesAndFoldersAtRoot = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const {
      rows: [root],
    } = await pool.query(
      'SELECT id FROM folders as f WHERE f.parent_id IS NULL and f.user_id = $1;',
      [userId]
    );
    const { id: rootId } = root;

    const { rows: folders } = await pool.query(
      'SELECT * FROM folders as f WHERE f.parent_id = $1',
      [rootId]
    );

    const { rows: files } = await pool.query(
      'SELECT * FROM files as f WHERE f.folder_id = $1',
      [rootId]
    );

    res.status(200).send({ folders, files });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// Fetch files and folder under a parent folder by id
const getFilesAndFoldersByParentId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const { rows: folders } = await pool.query(
      'SELECT * FROM folders AS f WHERE f.parent_id = $1;',
      [id]
    );

    const { rows: files } = await pool.query(
      'SELECT * FROM files as f WHERE f.folder_id = $1',
      [id]
    );

    res.status(200).send({ folders, files });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const Folder = {
  getFilesAndFoldersByParentId,
  getFilesAndFoldersAtRoot,
  createAtParentFolderId,
  removeAtParentFolderIdById,
};

export default Folder;
