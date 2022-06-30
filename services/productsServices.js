const managerModel = require('../models/salesModels');

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

const add = async (product) => {
  const [response] = await managerModel.add(product);

  if (!response) return [];

  return response;
};

module.exports = {
  getAll,
  getById,
  add,
};