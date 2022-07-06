const productsServices = require('../services/productsServices');
const httpStatus = require('../helpers/httpStatusCode');

const getAll = async (_req, res) => {
  try {
    const response = await productsServices.getAll();

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
    const response = await productsServices.getById(id);

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
    const response = await productsServices.add(name);

    if (response.status) {
      return res.status(response.status).json({ message: response.message });
    }    

    return res.status(httpStatus.CREATED).json(response);
  } catch (error) {
    console.error(error);
  }
}; 

const att = async (req, res) => {
  try {
    const validateName = await productsServices.validateName(req.body);
    const validateId = await productsServices.validateProductId(req.params);

    if (validateName.message) {
      return res
        .status(validateName.status)
        .json({ message: validateName.message });
    }
    if (validateId.message) {
      return res
        .status(validateId.status)
        .json({ message: validateId.message });
    }

    const response = await productsServices.att(req.params, req.body);
    return res.status(httpStatus.OK).json(response);
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const validateId = await productsServices.validateProductId(req.params);

    if (validateId.message) {
      return res
        .status(validateId.status)
        .json({ message: validateId.message });
    }

    await productsServices.deleteProduct(req.params);
    return res.status(httpStatus.NO_CONTENT).json();
  } catch (error) {
    console.error(error);
  }
};

const searchProduct = async (req, res) => {
  console.log(req.query.q);
  const response = await productsServices.searchProduct(req.query.q);

  return res.status(response.status).json(response.response);
};

module.exports = {
  getAll,
  getById,
  add,
  att,
  deleteProduct,
  searchProduct,
};