const connection = require('../helpers/connection');

const findProductId = async (id) => {
  const [response] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE product_id = ? LIMIT 1',
    [id],
  );
  return response;
};

const registerSales = async (sales) => {
  await connection.execute('INSERT INTO StoreManager.sales (`date`) VALUES (NOW())');
  const [saleId] = await connection.execute(
    'SELECT * FROM StoreManager.sales ORDER BY id DESC LIMIT 1',
  );
  sales.forEach(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (`sale_id`,`product_id`,`quantity`) VALUES (?,?,?)',
      [saleId[0].id, productId, quantity],
    );
  });
  const [response] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE `sale_id` = ?',
    [saleId[0].id],
  );
  return response;
};

module.exports = {
  findProductId,
  registerSales,
};
