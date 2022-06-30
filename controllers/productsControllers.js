const managerService = require('../services/productsServices');
const httpStatus = require('../helpers/httpStatusCode');

const getAll = async (_req, res) => {
  try {
    const response = await managerService.getAll();

    if (!response || response.length < 1) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Product not found' });
    }

    return res.status(httpStatus.OK).json(response);
  } catch (error) {
    console.error(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await managerService.getById(id);

    if (!response || response.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Product not found' });
    }

    return res.status(httpStatus.OK).json(response);
  } catch (error) {
    console.error(error);
  }
};

const add = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: '"name" is required' });
    }

    if (name.length < 5) {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: '"name" length must be at least 5 characters long' });
    }

    const response = await managerService.add(name);
    
    return res.status(httpStatus.CREATED).json(response);
  } catch (error) {
    console.error(error);
  }
}; 

module.exports = {
  getAll,
  getById,
  add,
};