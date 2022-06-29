const managerModel = require('../models/managerModel');

const getAll = async () => {
  const response = await managerModel.getAll();

  if (!response) return [];

  return response;
};

const getById = async (id) => {
  const response = await managerModel.getById(id);

  if (!response) return [];

  return response;
};

module.exports = {
  getAll,
  getById,
};