const salesServices = require('../services/salesServices');
const httpStatus = require('../helpers/httpStatusCode');

const registrySales = async (req, res) => {
  try {
    const validateReqBody = await salesServices.validateBodyReq(req.body);
    const validateProductId = await salesServices.validadeProductId(req.body);

    if (validateReqBody.message) {
      return res
        .status(validateReqBody.status)
        .json({ message: validateReqBody.message });
    }
    if (validateProductId.message) {
      return res
        .status(validateProductId.status)
        .json({ message: validateProductId.message });
    }

    const response = await salesServices.registerSales(req.body);
    return res.status(httpStatus.CREATED).json(response);
  } catch (error) {
    console.log(error);
  }
};

const findAllSales = async (req, res) => {
  try {
    const response = salesServices.findAllSales();
    if (response.message) {
      return res
        .status(response.status)
        .json({ message: response.message });
    }
    return res.status(httpStatus.OK).json(response);
  } catch (error) {
    console.log(error);
  }
};

const findSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = salesServices.findSaleById(id);

    if (response.message) {
      return res
        .status(response.status)
        .json({ message: response.message });
    }

    return res.status(httpStatus.OK).json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registrySales,
  findAllSales,
  findSaleById,
};
