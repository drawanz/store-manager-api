const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../../helpers/connection");
const salesModels = require("../../../models/salesModels");

describe("Desenvolve os testes para a camada de sales da Models", async () => {
  const newSale = [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 1,
      quantity: 1,
    },
  ];

  describe("Verifica a função getSaleId", async () => {
    const payload = [[{ id: 3, date: "2022-07-04T18:24:35.000Z" }]];
    before(async () => {
      await sinon.stub(connection, "execute").returns(payload);
    });
    after(async () => {
      await connection.execute.restore();
    });

    it("Testa a função getSaleId", async () => {
      const response = await salesModels.getSaleId();
      expect(response).to.be.equal(3);
    });
  });
});
