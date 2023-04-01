const chai = require('chai');
const expect = chai.expect;
const should = chai.should(); // should needs to be called as a function but expect does not need too
const chaiHttp = require('chai-http'); // chatHTTP is a chai plugin which you need to use to connect to HTTP and routes.js so you can use chai to test you API and get a response
const mocha = require('mocha'); 
var describe = mocha.describe
var it = mocha.it // alternatively, replace lines 7 to 9 with const { describe, it } = require('mocha');
const app = require('../index.js'); // const router = require('../routes/routes.js');
const Model = require('../model/model.js');

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
  var id;
  it('🧹 🧹 🧹 Test 1: Post data', (done) => {
    const data = new Model({
      food: "Apple Tart",
      qty: 1
    })
    chai.request(app)
    .post('/api/post') 
    .send(data)
    .end((err, res) =>{
      res.should.have.status(200); 
      res.body.should.be.a('object');
      res.body.should.have.property('food').eq("Apple Tart");
      res.body.should.have.property('qty').eq(1);
<<<<<<< HEAD
      if (res.body.data){
=======
      if (res.body.data !== undefined) { // basic error handling
>>>>>>> f1267e9e4ab656d34005a49ee26e3f36e58502a1
        id = res.body.data._id;
      }
      done(); 
    });
  });

  it('🧹 🧹 🧹 Test 2: Put data', (done) => {
    //const id = "6427bf2085a29797850b5480";
    const data = new Model({
      food: "Banana cumble pie",
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

  it('🧹 🧹 🧹 Test 3: Get data', (done) => {
<<<<<<< HEAD
    const id = "64281e4196f22c655ab6facf";
=======
    //const id = "6427dccca37d9bf07fb6f4b9";
>>>>>>> f1267e9e4ab656d34005a49ee26e3f36e58502a1
    chai.request(app)
    .get("/api/get/" + id) 
    .end((err, res) =>{
      //console.log(res);
      res.should.have.status(200);
      //res.body.should.be.a('object');
<<<<<<< HEAD
      res.body.should.have.property('food').eq("Strawberry Drink");
      res.body.should.have.property('qty').eq(5);
=======
      res.body.should.have.property('food').eq("Apple Tart");
      res.body.should.have.property('qty').eq(1);
>>>>>>> f1267e9e4ab656d34005a49ee26e3f36e58502a1
      done(); 
    });
  });

  it('🧹 🧹 🧹 Test 4: Delete data', (done) => {
<<<<<<< HEAD
    const id = "6428099fd1948c4b33568328";
=======
    //const id = "64208da9a33e8fca07677592";
>>>>>>> f1267e9e4ab656d34005a49ee26e3f36e58502a1
    chai.request(app)
    .delete("/api/delete/" + id) 
    .end((err, res) =>{
      res.should.have.status(200);
      done(); 
    });
  });
});
  