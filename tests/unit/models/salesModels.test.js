const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../helpers/connection');
const salesModels = require('../../../models/salesModels');

describe('Desenvolve os testes para a camada de sales da Models', async () => {
  describe('Verifica a função addSale', async () => {
    const payload = [{ insertId: 3 }];
    before(async () => {
      await sinon.stub(connection, 'execute').returns(payload);
    });
    after(async () => {
      await connection.execute.restore();
    });

    it('Testa a função addSale', async () => {
      const response = await salesModels.addSale();
      expect(response).to.be.equal(3);
    });
  });

  describe('Verifica a função registerSales', async () => {
    it('Testa a função registerSales', async () => {
      const payloadSale = [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 1,
          quantity: 1,
        },
      ];
      const payloadId = 3;
      await sinon.stub(connection, 'execute').returns([]);
      const response = await salesModels.registerSales(payloadSale, payloadId);
      expect(response).to.be.equal(3);
      await connection.execute.restore();
    });
  });

  describe('Verifica a função findSaleById', async () => {
    const payloadId = 3;
    const payload = [[{ date: '2022-07-05T16:45:29.000Z', productId: 3, quantity: 15 }]];
    before(async () => {
      await sinon.stub(connection, 'execute').returns(payload);
    });
    after(async () => {
      await connection.execute.restore();
    });

    it('Testa a função findSaleById', async () => {
      const response = await salesModels.findSaleById(payloadId);
      expect(response).to.be.an('array');
      expect(response[0]).to.have.property('date');
      expect(response[0]).to.have.property('productId');
      expect(response[0]).to.have.property('quantity');
    });
  });

  describe('Verifica a função findAllSales', async () => {
    const payload = [[
      {
        saleId: 1,
        date: '2022-07-05T13:45:29.000Z',
        productId: 1,
        quantity: 5,
      },
    ]];
    before(async () => {
      await sinon.stub(connection, 'execute').returns(payload);
    });
    after(async () => {
      await connection.execute.restore();
    });

    it('Testa a função findAllSales', async () => {
      const response = await salesModels.findSaleById();
      expect(response).to.be.an('array');
      expect(response[0]).to.have.property('saleId');
      expect(response[0]).to.have.property('date');
      expect(response[0]).to.have.property('productId');
      expect(response[0]).to.have.property('quantity');
    });
  });
});
