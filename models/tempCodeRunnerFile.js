const connection = require('../helpers/connection');

const query1 = 'SELECT SP.sale_id AS saleId, S.date, SP.product_id AS productId, SP.quantity';
const query1findById = 'SELECT S.date, SP.product_id AS productId, SP.quantity';
const query2 = ' FROM StoreManager.sales';
const query3 = ' AS S INNER JOIN StoreManager.sales_products AS SP ON S.id = SP.sale_id';
const query4 = ' WHERE SP.sale_id = ?';
const query5 = ' ORDER BY sale_id ASC , product_id ASC';

const addSale = async () => {
  await connection.execute('INSERT INTO StoreManager.sales (`date`) VALUES (NOW())');
};

const getSaleId = async () => {
  const [[{ id }]] = await connection.execute(
    'SELECT * FROM StoreManager.sales ORDER BY id DESC LIMIT 1',
  );
  return id;
};

getSaleId().then((r) => console.log(r));