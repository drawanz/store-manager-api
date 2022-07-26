const connection = require('../helpers/connection');

const query1 = 'SELECT SP.sale_id AS saleId, S.date, SP.product_id AS productId, SP.quantity';
const query1findById = 'SELECT S.date, SP.product_id AS productId, SP.quantity';
const query2 = ' FROM StoreManager.sales';
const query3 = ' AS S INNER JOIN StoreManager.sales_products AS SP ON S.id = SP.sale_id';
const query4 = ' WHERE SP.sale_id = ?';
const query5 = ' ORDER BY sale_id ASC , product_id ASC';

const addSale = async () => {
  const queryA = 'INSERT INTO StoreManager.sales (`date`) VALUES (NOW())';
  const [sale] = await connection.execute(queryA);
  return sale.insertId;
};

const registerSales = async (sales, id) => {
  await Promise.all(sales.map(async ({ productId, quantity }) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (`sale_id`,`product_id`,`quantity`) VALUES (?,?,?)',
      [id, productId, quantity],
    );
  }));
  return id;
};

const findSaleById = async (id) => {
  const [sales] = await connection.execute(
    query1findById + query2 + query3 + query4 + query5,
    [id],
  );
  return sales;
};

const findAllSales = async () => {
  const [sales] = await connection.execute(query1 + query2 + query3 + query5);
  return sales;
};

const deleteSale = async (id) => {
  const response = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return response;
};

const getSales = async () => {
  const [response] = await connection.execute(
    'SELECT * FROM StoreManager.sales',
  );
  return response;
};

// const payload = [
//   {
//     productId: 1,
//     quantity: 10,
//   },
//   {
//     productId: 2,
//     quantity: 50,
//   },
// ];

const attSale = async (sale, id) => {
  await Promise.all(sale.map(async ({ productId, quantity }) => {
    await connection.execute(
      'UPDATE StoreManager.sales_products SET `quantity` = ? WHERE sale_id = ? AND product_id = ?',
      [quantity, id, productId],
    );
  }));
  return id;
};

// attSale(payload, 1).then((r) => console.log(r));

module.exports = {
  addSale,
  registerSales,
  findSaleById,
  findAllSales,
  deleteSale,
  getSales,
  attSale,
};
