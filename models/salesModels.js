const connection = require('../helpers/connection');

const getAll = async () => {
  const [allProducts] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC',
  );
  return allProducts;
};

const getById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return product;
};

const add = async (product) => {
  await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [product],
  );
  const [productAdded] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?',
    [product],
  );
  return productAdded;
};

module.exports = {
  getAll,
  getById,
  add,
};
