const sinon = require("sinon");
const { expect } = require("chai");
const salesServices = require('../../../services/salesServices');
const salesControllers = require('../../../controllers/salesControllers');

describe('Desenvolve os testes para a camada de sales da Controllers', () => {
  const res = {};
  const req = {};
  describe.only('Verifica a função registrySales', () => {

    it("Testa a registrySales com caso de fala no corpo da requisição", async () => {
      const payload = {
        status: 404,
        message: 'Error'
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(payload);
      sinon.stub(salesServices, "validateBodyReq").returns(payload);
      sinon.stub(salesServices, "validateProductId").returns({});
      sinon.stub(salesServices, "registerSales").returns([]);

      const validateReqBody = await salesServices.validateBodyReq(1);
      await salesControllers.registrySales(req, res);
      expect(res.json.calledWith({ message: validateReqBody.message })).to.be.equal(true);
      expect(res.status.calledWith(404)).to.be.equal(true);

      salesServices.validateBodyReq.restore();
      salesServices.validateProductId.restore();
      salesServices.registerSales.restore();
    });

    it("Testa a registrySales com caso de fala no productId da requisição", async () => {
      const payload = {
        status: 404,
        message: "Error",
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(payload);
      sinon.stub(salesServices, "validateBodyReq").returns({});
      sinon.stub(salesServices, "validateProductId").returns(payload);
      sinon.stub(salesServices, "registerSales").returns([]);

      const validateProductId = await salesServices.validateProductId(1);
      await salesControllers.registrySales(req, res);
      expect(
        res.json.calledWith({ message: validateProductId.message })
      ).to.be.equal(true);
      expect(res.status.calledWith(404)).to.be.equal(true);

      salesServices.validateBodyReq.restore();
      salesServices.validateProductId.restore();
      salesServices.registerSales.restore();
    });

    it("Testa a registrySales com caso de sucesso", async () => {
      const payload = {
        id: 3,
        itemsSold: [
          {
            productId: 1,
            quantity: 1,
          },
        ],
      };
      const payloadSales = [
        {
          productId: 1,
          quantity: 1,
        },
      ];
      req.body = sinon.stub().returns(payloadSales);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(payload);
      sinon.stub(salesServices, "validateBodyReq").returns({});
      sinon.stub(salesServices, "validateProductId").returns({});
      sinon.stub(salesServices, "registerSales").returns(payloadSales);

      const response = await salesServices.registerSales(req.body);
      await salesControllers.registrySales(req, res);
      expect(res.json.calledWith(response)).to.be.equal(true);
      expect(res.status.calledWith(201)).to.be.equal(true);

      salesServices.validateBodyReq.restore();
      salesServices.validateProductId.restore();
      salesServices.registerSales.restore();
    });
  });

  
});
