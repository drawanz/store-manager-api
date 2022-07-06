const httpStatus = require('../helpers/httpStatusCode');
const productsModels = require('../models/productsModels');
const salesModels = require('../models/salesModels');

const validateBodyReq = (sales) => {
  if (sales.some((sale) => 'productId' in sale === false)) {
    // significa que o array possui algum objeto sem o productId
    return { status: httpStatus.BAD_REQUEST,
      message: '"productId" is required',
    };
  }
  if (sales.some((sale) => 'quantity' in sale === false)) {
    // significa que o array possui algum objeto sem o quantity
    return { status: httpStatus.BAD_REQUEST,
      message: '"quantity" is required',
    };
  }
  if (sales.some(({ quantity }) => quantity <= 0)) {
    return { status: httpStatus.UNPROCESSABLE_ENTITY,
      message: '"quantity" must be greater than or equal to 1',
    };
  }
  return 'validação ok';
};

const validateProductId = async (sales) => {
  const allProducts = await productsModels.getAll();
  const validId = allProducts.map((e) => e.id);
  if (sales.some(({ productId }) => !validId.includes(productId))) {
    return {
      status: httpStatus.NOT_FOUND,
      message: 'Product not found',
    };
  }
  return 'validação ok';
};

const registerSales = async (sales) => {
  const saleAddedId = await salesModels.addSale();
  const response = await salesModels.registerSales(sales, saleAddedId);

  return {
    id: response,
    itemsSold: sales,
  };
};

const findAllSales = async () => {
  const response = await salesModels.findAllSales();
  if (response.length === 0) {
    return {
      status: httpStatus.NOT_FOUND,
      message: 'Sales not found',
    };
  }
  return response;
};

const findSaleById = async (id) => {
  const response = await salesModels.findSaleById(id);
  if (response.length === 0) {
    return {
      status: httpStatus.NOT_FOUND,
      message: 'Sale not found',
    };
  }
  return response;
};

const deleteSale = async ({ id }) => {
  const response = await salesModels.deleteSale(id);

  if (!response) return [];

  return response;
};

const validateSaleId = async ({ id }) => {
  const allSales = await salesModels.getSales();
  const validIds = allSales.map((e) => e.id);
  if (!validIds.includes(Number(id))) {
    return {
      status: httpStatus.NOT_FOUND,
      message: 'Sale not found',
    };
  }
  return 'validação ok';
};

const attSale = async (sale, { id }) => {
  const validateBody = await validateBodyReq(sale);
  const validateProdId = await validateProductId(sale);
  const validateSalesId = await validateSaleId({ id });

  if (validateBody.message) return validateBody;
  if (validateProdId.message) return validateProdId;
  if (validateSalesId.message) return validateSalesId;

  const response = await salesModels.attSale(sale, id);
  console.log(response);
  const message = {
    saleId: response,
    itemsUpdated: sale,
  };
  return message;
};

module.exports = {
  validateBodyReq,
  validateProductId,
  registerSales,
  findAllSales,
  findSaleById,
  validateSaleId,
  deleteSale,
  attSale,
};
