const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../../services/productsServices');
const productsModel = require('../../../models/productsModels');


describe('Desenvolve os testes para a camada de product da Services', async () => {
  const payloadProduct = [{
    id: 1,
    name: 'Shampoo',
  }];
  const payloadErroObj = {
    status: 422,
    message: '"name" length must be at least 5 characters long',
  };
  const id = 1;
  const name = 'Papel';
  const nameInvalid = 'Pao'

  describe('Verifica a função getAll', async () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves(payloadProduct);
    });
    after(() => {
      productsModel.getAll.restore();
    });
    it('Testa se retorna um array', async () => {
      const response = await productsServices.getAll();
      expect(response).to.be.a('array');
    });
  })

  describe('Verifica a função getById', async () => {
    before(() => {
      sinon.stub(productsModel, 'getById').resolves(payloadProduct);
    });
    after(() => {
      productsModel.getById.restore();
    });
    it('Testa se retorna um object', async () => {
      const response = await productsServices.getById(id);
      expect(response).to.be.a('object');
    });
    it('Testa se o objeto possui propriedade name e id', async () => {
      const response = await productsServices.getById(id);

      expect(response).to.have.property('name');
      expect(response).to.have.property('id');
    }); 
  });

  describe('Verifica a função add', async () => {
    before(() => {
      sinon.stub(productsModel, 'add').resolves(payloadProduct);
    });
    after(() => {
      productsModel.add.restore();
    });
    it('Testa se retorna um object', async () => {
      const response = await productsServices.add(name);
      expect(response).to.be.a('object');
    });
    it('Testa se o objeto possui propriedade name e id', async () => {
      const response = await productsServices.add(name);
      expect(response).to.have.property('name');
      expect(response).to.have.property('id');
    }); 

  describe('Verifica a função add com o name.length < 5', async () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves(payloadErroObj);
    });
    after(() => {
      productsModel.getAll.restore();
    });
    it('Testa se o objeto possui propriedade status e message com um name.length < 5', async () => {
      const response = await productsServices.add(nameInvalid);
      expect(response).to.have.property('status');
      expect(response).to.have.property('message');
    });
  });

  describe('Verifica a função add com o name recebendo undefined', async () => {
    before(() => {
      sinon.stub(productsModel, 'getAll').resolves(payloadErroObj);
    });
    after(() => {
      productsModel.getAll.restore();
    });
    it('Testa se o objeto possui propriedade status e message com um name undefined', async () => {
      const response = await productsServices.add(nameInvalid);
      expect(response).to.have.property('status');
      expect(response).to.have.property('message');
    });
  });
});
});
