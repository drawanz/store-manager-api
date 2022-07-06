const sinon = require("sinon");
const { expect } = require("chai");
const salesServices = require('../../../services/salesServices');
const salesControllers = require('../../../controllers/salesControllers');

describe('Desenvolve os testes para a camada de sales da Controllers', () => {
  const res = {};
  const req = {};

  describe('Verifica a função registrySales', () => {

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

  describe.only('Verifica a função findAllSales', () => {
    
    it("Testa a função findAllSales em caso de falha", async () => {
      const payload = {
        status: 404,
        message: "Sales not found",
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(payload);
      sinon.stub(salesServices, "findAllSales").returns(payload);

      const response = await salesServices.findAllSales();
      await salesControllers.findAllSales(req, res);
      expect(
        res.json.calledWith({ message: response.message })
      ).to.be.equal(true);
      expect(res.status.calledWith(404)).to.be.equal(true);

      salesServices.findAllSales.restore();
    });

    it("Testa a função findAllSales em caso de sucesso", async () => {
      const payloadSales = [
        {
          saleId: 1,
          date: '2022-07-06T11:51:37.000Z',
          productId: 1,
          quantity: 5
        },
      ];
      // res.status = sinon.stub().returns(res);
      // res.json = sinon.stub().returns(res);
      sinon.stub(salesServices, "findAllSales").returns(payloadSales);

      const response = await salesServices.findAllSales();
      await salesControllers.findAllSales(req, res);
      expect(res.json.calledWith(response)).to.be.equal(true);
      expect(res.status.calledWith(200)).to.be.equal(true);

      salesServices.findAllSales.restore();
    });
  });
});
