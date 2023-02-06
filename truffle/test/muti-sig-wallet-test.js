const chai = require("chai")
chai.use(require("chai-as-promised"))

const expect = chai.expect

const MultiSigWallet = artifacts.require("MultiSigWallet")

contract("MultiSigWallet", accounts => {
  const owners = [accounts[0], accounts[1], accounts[2]]
  const NUM_CONFIRMATIONS_REQUIRED = 2

  let wallet
  beforeEach(async () => {
    wallet = await MultiSigWallet.new(owners, NUM_CONFIRMATIONS_REQUIRED)
  })

  describe("constructor", () => {
    it("should deploy", async () => {
      const wallet = await MultiSigWallet.new(
        owners,
        NUM_CONFIRMATIONS_REQUIRED
      )

      for (let i = 0; i < owners.length; i++) {
        assert.equal(await wallet.owners(i), owners[i])
      }

      assert.equal(
        await wallet.NbrApprovalRequired(),
        NUM_CONFIRMATIONS_REQUIRED
      )
    })

    it("should reject if no owners", async () => {
      await expect(MultiSigWallet.new([], NUM_CONFIRMATIONS_REQUIRED)).to.be
        .rejected
    })

    it("should reject if num conf required > owners", async () => {
      await expect(MultiSigWallet.new(owners, owners.length + 1)).to.be.rejected
    })

    it("should reject if owners not unique", async () => {
      await expect(
        MultiSigWallet.new([owners[0], owners[0]], NUM_CONFIRMATIONS_REQUIRED)
      ).to.be.rejected
    })
  })

  // describe("recieve", async () => {
  //   it("should receive ether", async () => {
  //     const { logs } = await wallet.transfer({
  //       from: accounts[0],
  //       value: 1,
  //     })

  //     assert.equal(logs[0].event, "Deposit")
  //     assert.equal(logs[0].args.sender, accounts[0])
  //     assert.equal(logs[0].args.amount, 1)
  //     // assert.equal(logs[0].args.balance, 1)
  //   })
  // })

  describe("submit transaction", () => {
    const to = accounts[3]
    const value = 0
    const data = "0x0123"

    it("should submit transaction", async () => {
      const { logs } = await wallet.submit(to, value, data, {
        from: owners[0],
      })

      assert.equal(logs[0].event, "Submit")
      assert.equal(logs[0].args.txIndex, 0)

      const tx = await wallet.transactions(0)
      assert.equal(tx.to, to)
      assert.equal(tx.value, value)
      assert.equal(tx.data, data)
      assert.equal(tx.executed, false)
    })

    it("should reject if not owner", async () => {
      await expect(
        wallet.submit(to, value, data, {
          from: accounts[3],
        })
      ).to.be.rejected
    })
  })

  describe("approve transaction", () => {
    beforeEach(async () => {
      const to = accounts[3]
      const value = 0
      const data = "0x0123"

      await wallet.submit(to, value, data)
    })

    it("should approve", async () => {
      const { logs } = await wallet.approve(0, {
        from: owners[0],
      })

      assert.equal(logs[0].event, "Approve")
      assert.equal(logs[0].args.owner, owners[0])
      assert.equal(logs[0].args.txIndex, 0)

      const tx = await wallet.isApproved(0,owners[0])
      assert.equal(tx, true)
    })

    it("should reject if not owner", async () => {
      await expect(
        wallet.approve(0, {
          from: accounts[3],
        })
      ).to.be.rejected
    })

    it("should reject if tx does not exist", async () => {
      await expect(
        wallet.approve(1, {
          from: owners[0],
        })
      ).to.be.rejected
    })

    it("should reject if already approved", async () => {
      await wallet.approve(0, {
        from: owners[0],
      })

      await expect(
        wallet.approve(0, {
          from: owners[0],
        })
      ).to.be.rejected
    })
  })

  describe("execute transaction", () => {
    const to = accounts[3]
    const value = 0
    const data = "0x0"

    beforeEach(async () => {
      await wallet.submit(to, value, data, { from: owners[0] })
      await wallet.approve(0, { from: owners[0] })
      await wallet.approve(0, { from: owners[1] })
    })

    it("should execute", async () => {
      const { logs } = await wallet.execute(0)
      
      assert.equal(logs[0].event, "Execute")
      assert.equal(logs[0].args.txIndex, 0)

      const tx = await wallet.transactions(0)
      assert.equal(tx.executed, true)
    })

    it("should reject if already executed", async () => {
      await wallet.execute(0, {
        from: owners[0],
      })

      await expect(
        wallet.execute(0, {
          from: owners[0],
        })
      ).to.be.rejected
    })

    it("should reject if not owner", async () => {
      await expect(
        wallet.execute(0, {
          from: accounts[3],
        })
      ).to.be.rejected
    })

    it("should reject if tx does not exist", async () => {
      await expect(
        wallet.execute(1, {
          from: owners[0],
        })
      ).to.be.rejected
    })
  })

  describe("revoke approval", async () => {
    beforeEach(async () => {
      const to = accounts[3]
      const value = 0
      const data = "0x0"

      await wallet.submit(to, value, data)
      await wallet.approve(0, { from: owners[0] })
    })

    it("should revoke confirmation", async () => {
      const { logs } = await wallet.revoke(0, {
        from: owners[0],
      })

      assert.equal(logs[0].event, "Revoke")
      assert.equal(logs[0].args.owner, owners[0])
      assert.equal(logs[0].args.txIndex, 0)

      assert.equal(await wallet.isApproved(0, owners[0]), false)

    })

    it("should reject if not owner", async () => {
      await expect(
        wallet.revoke(0, {
          from: accounts[3],
        })
      ).to.be.rejected
    })

    it("should reject if tx does not exist", async () => {
      await expect(
        wallet.revoke(1, {
          from: owners[0],
        })
      ).to.be.rejected
    })
  })

  describe("owners", () => {
    it("should return owners", async () => {
      const res = await wallet.owners

      for (let i = 0; i < res.length; i++) {
        assert.equal(res[i], owners[i])
      }
    })
  })

 })