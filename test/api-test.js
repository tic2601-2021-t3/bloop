const chai = require('chai');
const expect = chai.expect;
const should = chai.should(); // should needs to be called as a function but expect does not need too
const chaiHttp = require('chai-http'); // chatHTTP is a chai plugin which you need to use to connect to HTTP and routes.js so you can use chai to test you API and get a response
const mocha = require('mocha'); 
var describe = mocha.describe
var it = mocha.it // alternatively, replace lines 7 to 9 with const { describe, it } = require('mocha');
const app = require('../index.js'); // const router = require('../routes/routes.js');
const { Data } = require('../model/model'); // Authentication and Authorisation implementation

chai.use(chaiHttp);

describe("🧙 🪄 Test Collection: Testing APIs that do not do anything 🪄 🧙", () => {
    it('🧹 🧹 🧹 Test 1: /api/simpleGET', (done) => {
      chai.request(app)//console.log(chai.request(app).get('/api/getME').end((err, res) => done()));
      .get('/api/simpleGET') // URL you want to test
      .end((err, res) =>{
        res.should.have.status(200); //expect(res).to.have.status(200);
        res.body.should.be.a('object');
        const actualVal = res.body.message;
        const expectedVal = "You got nothing 🔮";
        expect(actualVal).to.be.equal(expectedVal);
        done(); // we need done here to ensure the request from the server is completed BEFORE we go on to execute the assertions 
      });
    });

    it('🧹 🧹 🧹 Test 2: /api/simplePOST', (done) => {
      chai.request(app)//console.log(chai.request(app).get('/api/getME').end((err, res) => done()));
      .post('/api/simplePOST') // URL you want to test
      .end((err, res) =>{
        res.should.have.status(200); //expect(res).to.have.status(200);
        res.body.should.be.a('object');
        const actualVal = res.body.message;
        const expectedVal = "You posted nothing 🔮";
        expect(actualVal).to.be.equal(expectedVal);
        done(); // we need done here to ensure the request from the server is completed BEFORE we go on to execute the assertions 
      });
    });
    
    it('🧹 🧹 🧹 Test 3: /api/simplePUT', (done) => {
      chai.request(app)//console.log(chai.request(app).get('/api/getME').end((err, res) => done()));
      .put('/api/simplePUT') // URL you want to test
      .end((err, res) =>{
        res.should.have.status(200); //expect(res).to.have.status(200);
        res.body.should.be.a('object');
        const actualVal = res.body.message;
        const expectedVal = "You placed nothing 🔮";
        expect(actualVal).to.be.equal(expectedVal);
        done(); // we need done here to ensure the request from the server is completed BEFORE we go on to execute the assertions 
      });
    });

    it('🧹 🧹 🧹 Test 4: /api/simpleDELETE', (done) => {
      chai.request(app)//console.log(chai.request(app).get('/api/getME').end((err, res) => done()));
      .delete('/api/simpleDELETE') // URL you want to test
      .end((err, res) =>{
        res.should.have.status(200); //expect(res).to.have.status(200);
        res.body.should.be.a('object');
        const actualVal = res.body.message;
        const expectedVal = "You deleted nothing 🔮";
        expect(actualVal).to.be.equal(expectedVal);
        done(); // we need done here to ensure the request from the server is completed BEFORE we go on to execute the assertions 
      });
    });
  
});

describe("🧙 🪄 Test Collection: Testing APIs that interact with the MongoDB database 🪄 🧙", () => {
  var id; // global variable to store id of the object created using POST. 
  it('🧹 🧹 🧹 Test 1: Post data', (done) => { // creating Narnia Land Sprinkles
    const data = new Data({
      food: "Narnia Land Sprinkles",
      qty: 1
    })
    chai.request(app)
    .post('/api/post') 
    .send(data)
    .end((err, res) =>{
      res.should.have.status(200); 
      res.body.should.be.a('object');
      res.body.should.have.property('food').eq("Narnia Land Sprinkles");
      res.body.should.have.property('qty').eq(1);
      id = res.body._id;
      done(); 
    });
  });

  it('🧹 🧹 🧹 Test 2: Put data', (done) => { // changing Narnia Land Sprinkles to Fairy Land Sprinkles
    const data = new Data({
      food: "Fairy Land Sprinkles",
      qty: 2
    })
    chai.request(app)
    .put("/api/put/" + id) 
    .send(data)
    .end((err, res) =>{
      res.should.have.status(200);
      res.text.should.be.eq("Your entry has been updated 🔮");
      done(); 
    });
  });

  it('🧹 🧹 🧹 Test 3: Get data', (done) => { // getting only Fairy Land Sprinkles
    chai.request(app)
    .get("/api/get/" + id) 
    .end((err, res) =>{
      res.should.have.status(200);
      res.body.should.have.property('food').eq("Fairy Land Sprinkles");
      res.body.should.have.property('qty').eq(2);
      done(); 
    });
  });

  it('🧹 🧹 🧹 Test 4: Delete data', (done) => { // deleting Fairy Land Sprinkles
    chai.request(app)
    .delete("/api/delete/" + id) 
    .end((err, res) =>{
      res.should.have.status(200);
      done(); 
    });
  });
});
  