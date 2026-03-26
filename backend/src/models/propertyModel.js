const pool = require('../config/db');

const createProperty = async (data) => {
  const { title, description, price, location, owner_id } = data;

  const result = await pool.query(
    `INSERT INTO properties (title, description, price, location, owner_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [title, description, price, location, owner_id]
  );

  return result.rows[0];
};

const getAllProperties = async () => {
  const result = await pool.query('SELECT * FROM properties');
  return result.rows;
};

const deletePropertyById = async (id) => {
  await pool.query('DELETE FROM properties WHERE id = $1', [id]);
};

const getPropertyById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM properties WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

const updatePropertyById = async (id, data) => {
  const { title, description, price, location } = data;

  const result = await pool.query(
    `UPDATE properties 
     SET title = $1, description = $2, price = $3, location = $4
     WHERE id = $5
     RETURNING *`,
    [title, description, price, location, id]
  );

  return result.rows[0];
};

module.exports = {createProperty,getAllProperties,deletePropertyById, getPropertyById,updatePropertyById};
