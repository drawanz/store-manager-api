const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../helpers/connection');
const managerModel = require('../../../models/productsModels');

describe('Desenvolve os testes para a camada de products da Models', async () => {
  
  const payloadAdd = {
    name: 'ProdutoX',
  };
  const id = 1;
  const payloadProduct = [
    {
      id: 1,
      name: 'Shampoo',
    },
  ];
  describe('testa a função getAll', async () => {
    before(async () => {
      await sinon.stub(connection, 'execute').resolves(payloadProduct);
    });
    after(async () => {
      await connection.execute.restore();
    });
    it('verifica se a função retorna um objeto', async() => {
      const response = await managerModel.getAll();
      expect(response).to.be.a('object');
    })    
  })

  describe('testa a função getById', async () => {
    before(async () => {
      await sinon.stub(connection, 'execute').resolves(payloadProduct);
    });
    after(async () => {
      await connection.execute.restore();
    });
    it('verifica se a função retorna um objeto com id válido', async () => {
      const response = await managerModel.getById(id);
      expect(response).to.be.a('object');
    });
    it('verifica se o objeto possui propriedade name e id', async () => {
      const response = await managerModel.getById(id);
      expect(response).to.have.property('name');
      expect(response).to.have.property('id');
    }); 
  });

  describe('testa a função add', async () => {
    before(async () => {
      await sinon.stub(connection, 'execute').resolves(payloadProduct);
    });
    after(async () => {
      await connection.execute.restore();
    }); 
    it('verifica se a função retorna um objeto válido', async () => {
      const response = await managerModel.add(payloadAdd);
      expect(response).to.be.a('object');
    });
    it('verifica se o objeto possui propriedade name e id', async () => {
      const response = await managerModel.add(id);
      expect(response).to.have.property('name');
      expect(response).to.have.property('id');
    }); 
  })
})