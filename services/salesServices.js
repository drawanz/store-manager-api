const salesModels = require('../models/salesModels');
const httpStatus = require('../helpers/httpStatusCode');
const productsModels = require('../models/productsModels');

// if (!nameProduct) {
//   return {
//     status: httpStatus.BAD_REQUEST,
//     message: '"name" is required',
//   };
// }

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

const validadeProductId = async (sales) => {
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

const salee = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

module.exports = {
  validateBodyReq,
  validadeProductId,
};
