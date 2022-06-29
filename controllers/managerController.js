const managerService = require('../services/managerService');
const httpStatus = require('../helpers/httpStatusCode');

const getAll = async (_req, res) => {
  try {
    const response = await managerService.getAll();

    if (!response) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Product not found' });
    }

    res.status(httpStatus.OK).json(response);
  } catch (error) {
    console.error(error);

    res
      .status(httpStatus.INTERNAL_SERVER)
      .json({ message: 'Error to try to get products' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await managerService.getById(id);

    if (!response || response.length < 1) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Product not found' });
    }

    res.status(httpStatus.OK).json(response);
  } catch (error) {
    console.error(error);

    res
      .status(httpStatus.INTERNAL_SERVER)
      .send('Erro ao tentar realizar operação');
  }
};

module.exports = {
  getAll,
  getById,
};