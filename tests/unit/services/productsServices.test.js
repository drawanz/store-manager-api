const sinon = require("sinon");
const { expect } = require("chai");

const productsServices = require("../../../services/productsServices");
const productsModel = require("../../../models/productsModels");


describe('Desenvolve os testes para a camada de product da Services', async () => {
  const payloadProduct = [{
    id: 1,
    name: "Shampoo",
  }];

  const payloadErroObj = {
    status: 422,
    message: '"name" length must be at least 5 characters long',
  };

  const id = 1;

  const name = 'Papel';
  const nameInvalid = 'Pao'
  const nameUndefined = undefined;

  describe('testa a função getAll', async () => {
    before(async () => {
      await sinon.stub(productsModel, "getAll").resolves(payloadProduct);
    });

    after(async () => {
      await productsModel.getAll.restore();
    });

    it("testa se retorna um array", async () => {
      const response = await productsServices.getAll();

      expect(response).to.be.a("array");
    });
  })

  describe("testa a função getById", async () => {
    before(async () => {
      await sinon.stub(productsModel, "getById").resolves(payloadProduct);
    });

    after(async () => {
      await productsModel.getById.restore();
    });

    it("testa se retorna um object", async () => {
      const response = await productsServices.getById(id);

      expect(response).to.be.a("object");
    });

    it("verifica se o objeto possui propriedade name e id", async () => {
      const response = await productsServices.getById(id);

      expect(response).to.have.property("name");
      expect(response).to.have.property("id");
    }); 
  });

  describe("testa a função add", async () => {
    before(async () => {
      await sinon.stub(productsModel, "add").resolves(payloadProduct);
    });

    after(async () => {
      await productsModel.add.restore();
    });

    it("testa se retorna um object", async () => {
      const response = await productsServices.add(name);

      expect(response).to.be.a("object");
    });

    it("verifica se o objeto possui propriedade name e id", async () => {
      const response = await productsServices.add(name);

      expect(response).to.have.property("name");
      expect(response).to.have.property("id");
    }); 

    describe("testa a função add com o name.length < 5", async () => {
      before(async () => {
        await sinon.stub(productsModel, "getAll").resolves(payloadErroObj);
      });

      after(async () => {
        await productsModel.getAll.restore();
      });

      it("verifica se o objeto possui propriedade status e message com um name.length < 5", async () => {
        const response = await productsServices.add(nameInvalid);

        expect(response).to.have.property("status");
        expect(response).to.have.property("message");
      });
    });

    describe("testa a função add com o name recebendo undefined", async () => {
      before(async () => {
        await sinon.stub(productsModel, "getAll").resolves(payloadErroObj);
      });

      after(async () => {
        await productsModel.getAll.restore();
      });

      it("verifica se o objeto possui propriedade status e message com um name undefined", async () => {
        const response = await productsServices.add(nameInvalid);

        expect(response).to.have.property("status");
        expect(response).to.have.property("message");
      });
    });
  });
});
