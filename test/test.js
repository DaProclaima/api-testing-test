var chai = require('chai')
  , chaiHttp = require('chai-http');
// import server from '../index';


chai.use(chaiHttp);
var expect = chai.expect;

// case 1
describe('GET REQUEST RETURN A STATUS 404 OK',
  function () {
    it('Response should be 404 GET REQUEST',
      function () {
        chai.request('http://localhost:3000/todoitems').get('/wrongitem')
          .end(function (err, res) {
            expect(res).to.have.status(404);
          });
      });
  });



// case 2
describe('GET REQUEST RETURN A STATUS 200 OK',
  function () {
    it('Response should be 200 OK on a GET REQUEST',
      function () {
        chai.request('http://localhost:3000/todoitems').get('/')
          .end(function (err, res) {
            expect(res).to.have.status(200);
          });
      });
  });

// case 3
describe('POST REQUEST RETURN A STATUS 200 OK',
  function () {
    it('Response should be 200 OK on a POST REQUEST',
      function () {
        chai.request('http://localhost:3000/todoitems').post('/')
          .end(function (err, res) {
            expect(res).to.have.status(200);
          });
      });
  });

// case 3.1
describe('POST REQUEST RETURN A STATUS 500 wrong body request',
  function () {
    it('Response should be 500 wrong body request on a POST REQUEST',
      function () {
        chai.request('http://localhost:3000/todoitems').post('{\n' +
          '\t"name":"Ma tache ",\n' +
          '\t"status":"wrong"\n' +
          '}')
          .end(function (err, res) {
            expect(res).to.have.status(500);
          });
      });
  });

// case 4
describe('PUT REQUEST RETURN A STATUS 200 OK',
  function () {
    it('Response should be 200 OK on a POST REQUEST',
      function () {
        chai.request('http://localhost:3000/todoitems').put('{\n' +
          '\t"name":"Ma tache ",\n' +
          '\t"status":"inProgress"\n' +
          '}')
          .end(function (err, res) {
            expect(res).to.have.status(200);
          });
      });
  });


// case 5
describe('DELETE REQUEST RETURN A STATUS 200 OK',
  function () {
    it('Response should be 200 OK on a DELETE REQUEST',
      function () {
        chai.request('http://localhost:3000/todoitems').put('{\n' +
          '\t"name":"Ma tache ",\n' +
          '\t"status":"done"\n' +
          '}')
          .end(function (err, res) {
            expect(res).to.have.status(200);
          });
      });
  });

// case 6
describe('DELETE REQUEST RETURN A STATUS 200 OK',
  function () {
    it('Response should be 200 OK on a DELETE REQUEST',
      function () {
        chai.request('http://localhost:3000/todoitems').put('{\n' +
          '\t"name":"Ma tache ",\n' +
          '\t"status":"done"\n' +
          '}')
          .end(function (err, res) {
            expect(res).to.have.status(200);
          });
      });
  });




