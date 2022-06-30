const managerModel = require('../models/productsModels');
const httpStatus = require('../helpers/httpStatusCode');

const getAll = async () => {
  const response = await managerModel.getAll();

  if (!response) return [];

  return response;
};

const getById = async (id) => {
  const [response] = await managerModel.getById(id);

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

  const [response] = await managerModel.add(nameProduct);

  if (!response) return [];
  
  return response;
};

module.exports = {
  getAll,
  getById,
  add,
};