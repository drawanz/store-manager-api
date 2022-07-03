const connection = require('../helpers/connection');

const query1 = 'SELECT SP.sale_id, S.date, SP.product_id, SP.quantity FROM StoreManager.sales';
const query2 = ' AS S INNER JOIN StoreManager.sales_products AS SP ON S.id = SP.sale_id';
const query3 = ' WHERE SP.product_id = ?';
const query4 = ' ORDER BY sale_id ASC , product_id ASC';

const registerSales = async (sales) => {
  await connection.execute('INSERT INTO StoreManager.sales (`date`) VALUES (NOW())');
  const [saleId] = await connection.execute(
    'SELECT * FROM StoreManager.sales ORDER BY id DESC LIMIT 1',
  );
  const { id } = saleId[0];
  sales.forEach(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (`sale_id`,`product_id`,`quantity`) VALUES (?,?,?)',
      [id, productId, quantity],
    );
  });
  return id;
};

const findSaleById = async (id) => {
  const [sales] = await connection.execute(query1 + query2 + query3 + query4, [id]);
  return sales;
};

const findAllSales = async () => {
  const [sales] = await connection.execute(query1 + query2 + query4);
  return sales;
};

module.exports = {
  registerSales,
  findSaleById,
  findAllSales,
};
