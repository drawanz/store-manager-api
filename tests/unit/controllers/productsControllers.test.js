const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../../controllers/productsControllers');
const productsService = require('../../../services/productsServices');

describe('Desenvolve os testes para a camada de product da Controllers', () => {
  describe('Verifica a função getAll com caso de sucesso', () => {
    const res = {};
    const req = {};
    const payloadOk = [
      {
        id: 1,
        name: 'Shampoo',
      },
    ];
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(payloadOk);
      sinon.stub(productsService, 'getAll').resolves(payloadOk);
    });
    after(() => {
      productsService.getAll.restore();
    });
    it('Testa se a função getAll retorna os dados corretos', async () => {
      await productsController.getAll(req, res);
      expect(res.json.calledWith(payloadOk)).to.equal(true);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Verifica a função getById com caso de sucesso', () => {
    const res = {};
    const req = {};
    const payloadId = 1;
    const payloadOk = [
      {
        id: 1,
        name: 'Shampoo',
      },
    ];
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(payloadOk);
      req.params = sinon.stub().returns(payloadId);
      sinon.stub(productsService, 'getById').returns(payloadOk);
    });
    after(() => {
      productsService.getById.restore();
    });
    it('Testa se a função getById retorna os dados corretos', async () => {
      await productsController.getById(req, res);
      expect(res.json.calledWith(payloadOk)).to.equal(true);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Verifica a função add com caso de sucesso', () => {
    const res = {};
    const req = {};
    const payloadId = 1;
    const payloadOk = [
      {
        id: 1,
        name: 'Shampoo',
      },
    ];
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(payloadOk);
      req.body = sinon.stub().returns(payloadId);
      sinon.stub(productsService, 'add').returns(payloadOk);
    });
    after(() => {
      productsService.add.restore();
    });
    it('Testa se a função add retorna os dados corretos', async () => {
      await productsController.add(req, res);
      expect(res.json.calledWith(payloadOk)).to.equal(true);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });
});