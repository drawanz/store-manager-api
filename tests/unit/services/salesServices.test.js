const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/salesServices');
const productsModels = require('../../../models/productsModels');
const salesModels = require('../../../models/salesModels');

describe('Desenvolve os testes para a camada de sales da Services', () => {
  describe('Verifica a função validateBodyReq', () => {
    it('Testa a função validateBodyReq com parametro sem o productId', () => {
      const payloadSale = [
        {
          quantity: 1,
        },
      ];
      const response = salesServices.validateBodyReq(payloadSale);
      expect(response).to.be.an('object');
      expect(response).to.have.property('message');
      expect(response.message).to.be.equal('"productId" is required');
    });
    it('Testa a função validateBodyReq com parametro sem o quantity', () => {
      const payloadSale = [
        {
          productId: 1,
        },
      ];
      const response = salesServices.validateBodyReq(payloadSale);
      expect(response).to.be.an('object');
      expect(response).to.have.property('message');
      expect(response.message).to.be.equal('"quantity" is required');
    });
    it('Testa a função validateBodyReq com parametro quantity < 1', () => {
      const payloadSale = [
        {
          productId: 1,
          quantity: 0,
        },
      ];
      const response = salesServices.validateBodyReq(payloadSale);
      expect(response).to.be.an('object');
      expect(response).to.have.property('message');
      expect(response.message).to.be.equal(
        '"quantity" must be greater than or equal to 1'
      );
    });
    it('Testa a função validateBodyReq com parametro ok', () => {
      const payloadSale = [
        {
          productId: 1,
          quantity: 1,
        },
      ];
      const response = salesServices.validateBodyReq(payloadSale);
      expect(response).to.be.equal('validação ok');
    });
  });

  describe('Verifica a função validateProductId', () => {
    const payload = [
      {
        id: 1,
        name: 'Shampoo',
      },
    ];
    before(() => {
      sinon.stub(productsModels, 'getAll').resolves(payload);
    });
    after(() => {
      productsModels.getAll.restore();
    });
    it('Testa a função validateProductId com productId inexistente', async () => {
      const payloadSale = [
        {
          productId: 27,
          quantity: 5,
        },
      ];
      const response = await salesServices.validateProductId(payloadSale);
      expect(response).to.be.an('object');
      expect(response.message).to.be.equal('Product not found');
    });
  });

  describe('Verifica a função validateProductId', () => {
    const payload = [
      {
        id: 1,
        name: 'Shampoo',
      },
    ];
    before(() => {
      sinon.stub(productsModels, 'getAll').resolves(payload);
    });
    after(() => {
      productsModels.getAll.restore();
    });
    it('Testa a função validateProductId com productId ok', async () => {
      const payloadSale = [
        {
          productId: 1,
          quantity: 5,
        },
      ];
      const response = await salesServices.validateProductId(payloadSale);
      expect(response).to.be.an('string');
      expect(response).to.be.equal('validação ok');
    });
  });

  describe('Verifica a função registerSales', () => {
    const payloadId = 2;
    const payloadSale = [
      {
        productId: 1,
        quantity: 1,
      },
    ];
    before(() => {
      sinon.stub(salesModels, 'addSale').resolves(payloadId);
      sinon.stub(salesModels, 'registerSales').resolves(payloadId);
    });
    after(() => {
      salesModels.addSale.restore();
      salesModels.registerSales.restore();
    });
    it('Testa a função registerSales', async () => {
      const response = await salesServices.registerSales(payloadSale);
      expect(response).to.be.an('object');
    });
  });

  describe('Verifica a função findAllSales', () => {
    it('Testa a função findAllSales com condição de sucesso', async () => {
      const payloadSale = [
        {
          saleId: 1,
          date: '2022-07-05T21:06:10.000Z',
          productId: 1,
          quantity: 5
        },
      ];
      sinon.stub(salesModels, 'findAllSales').resolves(payloadSale);
      const response = await salesServices.findAllSales(payloadSale);
      expect(response).to.be.equal(payloadSale);
      salesModels.findAllSales.restore();
    });

    it('Testa a função findAllSales com condição de falha', async () => {
      const payloadSale = [];
      sinon.stub(salesModels, 'findAllSales').resolves(payloadSale);
      const response = await salesServices.findAllSales(payloadSale);
      expect(response).to.be.an('object');
      expect(response.message).to.be.equal('Sales not found');
      salesModels.findAllSales.restore();
    });
  });

  describe('Testa a função findSaleById', () => {
    it('Testa a função findSaleById em caso de sucesso', async () => {
      const payloadId = 1;
      const payload = [
        { date: '2022-07-05T19:23:13.000Z', productId: 1, quantity: 5 },
      ];
      sinon.stub(salesModels, 'findSaleById').resolves(payload);
      const response = await salesServices.findSaleById(payloadId);
      expect(response).to.be.an('array');
      expect(response[0]).to.be.have.property('date');
      expect(response[0]).to.be.have.property('productId');
      expect(response[0]).to.be.have.property('quantity');
      salesModels.findSaleById.restore();

    });
    it('Testa a função findSaleById em caso de sucesso', async () => {
      const payloadId = 1;
      const payload = [];
      sinon.stub(salesModels, 'findSaleById').resolves(payload);
      const response = await salesServices.findSaleById(payloadId);
      expect(response).to.be.an('object');
      expect(response.message).to.be.equal('Sale not found');
      salesModels.findSaleById.restore();
    });
  });
});
