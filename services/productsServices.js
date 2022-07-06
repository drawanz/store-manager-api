const productsModels = require('../models/productsModels');
const httpStatus = require('../helpers/httpStatusCode');

const getAll = async () => {
  const response = await productsModels.getAll();

  if (!response) return [];

  return response;
};

const getById = async (id) => {
  const [response] = await productsModels.getById(id);

  if (!response) return [];

  return response;
};

const add = async (nameProduct) => {
  if (!nameProduct) {
    return {
      status: httpStatus.BAD_REQUEST,
      message: '"name" is required',
    };
  }

  if (nameProduct.length < 5) {
    return {
      status: httpStatus.UNPROCESSABLE_ENTITY,
      message: '"name" length must be at least 5 characters long',
    };
  }

  const [response] = await productsModels.add(nameProduct);

  if (!response) return [];
  
  return response;
};

const validateProductId = async ({ id }) => {
  const allProducts = await productsModels.getAll();
  const validIds = allProducts.map((e) => e.id);
  console.log();
  if (!validIds.includes(Number(id))) {
    return {
      status: httpStatus.NOT_FOUND,
      message: 'Product not found',
    };
  }
  return 'validação ok';
};

const validateName = async ({ name }) => {
  if (!name) {
    return {
      status: httpStatus.BAD_REQUEST,
      message: '"name" is required',
    };
  }

  if (name.length < 5) {
    return {
      status: httpStatus.UNPROCESSABLE_ENTITY,
      message: '"name" length must be at least 5 characters long',
    };
  }
  return 'validação ok';
};

const att = async ({ id }, { name }) => {
  const response = await productsModels.att(id, name);

  if (response === 0) return [];

  return {
    id,
    name,
  };
};

const deleteProduct = async (id) => {
  const response = await productsModels.deleteProduct(id);

  if (!response) return [];

  return response;
};

module.exports = {
  getAll,
  getById,
  add,
  att,
  validateProductId,
  validateName,
  deleteProduct,
};