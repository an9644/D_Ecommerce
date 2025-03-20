const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("ACtoken and DEcommerce", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const ACToken = await ethers.getContractFactory("ACToken");
    const acToken = await ACToken.deploy();

    const DEcommerce = await ethers.getContractFactory("DEcommerce");
    const decommerce = await DEcommerce.deploy(acToken.address);

    return { acToken, decommerce, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right acTokenAddress", async function () {
      const { decommerce, acToken } = await loadFixture(deployFixture);

      expect(await decommerce.acTokenAddress()).to.equal(acToken.address);
    });

    it("Should set the right owner", async function () {
      const { decommerce, owner } = await loadFixture(deployFixture);

      expect(await decommerce.owner()).to.equal(owner.address);
    });
  });

  describe("Asset creation", function () {
    it("Should create an asset", async function () {
      const { decommerce, owner } = await loadFixture(deployFixture);

      await decommerce.createAsset("Test Asset", "This is a test asset", "https://example.com/image.jpg", 100);

      expect(await decommerce.assets(1)).to.have.property("id", 1);
      expect(await decommerce.assets(1)).to.have.property("name", "Test Asset");
      expect(await decommerce.assets(1)).to.have.property("description", "This is a test asset");
      expect(await decommerce.assets(1)).to.have.property("imageURL", "https://example.com/image.jpg");
      expect(await decommerce.assets(1)).to.have.property("price", 100);
      expect(await decommerce.assets(1)).to.have.property("owner", owner.address);
    });
  });

  describe("Asset buying", function () {
    it("Should buy an asset", async function () {
      const { decommerce, owner, otherAccount } = await loadFixture(deployFixture);

      await decommerce.createAsset("Test Asset", "This is a test asset", "https://example.com/image.jpg", 100);

      await decommerce.connect(otherAccount).buyAsset(1);

      expect(await decommerce.assets(1)).to.have.property("owner", otherAccount.address);
    });
  });
});