
process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
chai.use(chaiHttp);
let expect = chai.expect;

chai.use(chaiHttp);


describe('purchase route',()=>{
  it("should update wallet and save transaction", async () =>{
    chai.request(server)
        .post('/purchase')
        .send({
            user_id: '4537ee34-777d-487e-8fee-cb77aa0cdb95',
            amount: 11,
        })
        .end(async (err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.data.wallet_balance).to.equal(989)
            expect(res.body.data.transaction_id).to.not.null;
        });
  });

  it("should throw insufficient funds error", async () =>{
    chai.request(server)
        .post('/purchase')
        .send({
          user_id: '4537ee34-777d-487e-8fee-cb77aa0cdb95',
          amount: 1100,
        })
        .end(async (err, res) => {
          expect(res.status).to.equal(401)
          expect(res.body.error).to.equal('insufficient funds')
        });
  });
})
