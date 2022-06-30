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

module.exports = {
  getAll,
  getById,
};