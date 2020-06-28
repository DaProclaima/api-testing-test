// var chai = require('chai')
//   , chaiHttp = require('chai-http')
//   , chaiJson = require('chai-json');
//
// chai.use(chaiHttp);
// chai.use(chaiJson);
// var expect = chai.expect;
//
// // case 1
// describe('GET REQUEST RETURN A STATUS 404 OK',
//   function () {
//     it('Response should be 404 GET REQUEST',
//       function (done) {
//         chai.request('http://localhost:3000/todoblablablaitems')
//           .get('/')
//           .end(function (err, res) {
//             expect(res).to.have.status(404);
//             done();
//           });
//       });
//   });
//
// // case 2
// describe('GET REQUEST RETURN A STATUS 200 OK',
//   function () {
//     it('Response should be 200 OK on a GET REQUEST',
//       function (done) {
//         chai.request('http://localhost:3000/todoitems')
//           .get('/')
//           .end(function (err, res) {
//             expect(res).to.have.status(200);
//             done();
//           });
//       });
//   });
//
// // // case 3
// describe('POST REQUEST RETURN A STATUS 200 OK',
//   function () {
//     it('Response should be 200 OK on a POST REQUEST',
//       function (done) {
//         chai.request('http://localhost:3000/todoitems')
//           .post('/')
//           .send({name: 'Ma tache', status: 'inProgress'})
//           .end(function (err, res) {
//             expect(res).to.have.status(200);
//             done();
//           });
//       });
//   });
//
// // case 3.1
// describe('POST REQUEST RETURN A STATUS 500 wrong body request',
//   function () {
//     it('Response should be 500 wrong body request on a POST REQUEST',
//       function (done) {
//         chai.request('http://localhost:3000/todoitems')
//           .post('/')
//           .send({
//             'name': 'Ma tache',
//             'status': 'wrong'
//           })
//           .end(function (err, res) {
//             expect(res).to.have.status(500);
//             done();
//           });
//       });
//   });
//
// // case 4
// describe('PUT REQUEST RETURN A STATUS 200 OK',
//   function () {
//     it('Response should be 200 OK on a POST REQUEST',
//       function (done) {
//         chai.request('http://localhost:3000/todoitems')
//           .put('/5e1db2b62d65a9509691f83e')
//           .send({
//             '_id': '5e1db2b62d65a9509691f83e',
//             'updatedAt': '2020-01-13T15:25:16.012Z',
//             'createdAt': '2020-01-13T15:25:16.012Z',
//             'name': 'Ma tache done ',
//             '__v': 0,
//             'status': 'done'
//           })
//           .end(function (err, res) {
//             expect(res).to.have.status(200);
//             done();
//           });
//       });
//   });
//
// // case 5
// describe('DELETE REQUEST RETURN A STATUS 200 OK',
//   function () {
//     it('Response should be 200 OK on a DELETE REQUEST',
//       function (done) {
//         chai.request('http://localhost:3000/todoitems')
//           .del('/5e1db2b62d65a9509691f83e')
//           .end(function (err, res) {
//             // print(JSON.stringify(res));
//             expect(res).to.have.status(200);
//             done();
//           });
//       });
//   });
//
// // case 6
// describe('POST REQUEST response is expected to be json object',
//   function () {
//     it('Response should be a json file',
//       function (done) {
//         chai.request('http://localhost:3000/todoitems')
//           .post('/5e1c8bdc90a6062975457d9f')
//           .end(function (err, res) {
//             expect(res).to.be.a.jsonFile();
//             // expect(res).to.have.status(200);
//             done();
//           });
//       });
//   });
//
//
//
//



// CORRECTION


const mongoose = require('mongoose');
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;

const server = require('../index');
const todoItems = require('../api/model/TodoItem');
const TodoItem = mongoose.model('TodoItem', todoItems);

describe('Test suite for API testing', function() {
  beforeEach((done) => {
    TodoItem.remove({}, () => {
      done();
    });
  });
// ->> 1
  it('Response should be 200 if URL is correct with a GET request', function(done) {
    chai.request(server)
      .get('/todoitems')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        res.should.be.json;
        done();
      });
  });
// -->> 2
  it('Response should be 404 if URL is incorrect with a bad GET request', function(done) {
    chai.request(server)
      .get('/todoitemss')
      .end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });
// -->> 3
  it('Response should be 200 with a POST request', function(done) {
    const param = {
      name: 'Ma tache',
      status: 'done'
    };
    chai.request('http://localhost:3000/todoitems')
      .post('/')
      .send(param)
      .end(function(err, res) {
        expect(res).to.have.status(200);
        res.should.be.json;
        res.body.name.should.eql(param.name);
        res.body.status.should.eql(param.status);
        done();
      });
  });
  // -->> 3.1
  it('Response should be 500 with a bad POST request', function(done) {
    const param = {
      name: 'Ma tache updated',
      status: 'don'
    };
    chai.request(server)
      .post('/todoitems')
      .send(param)
      .end(function(err, res) {
        expect(res).to.have.status(500);
        res.body.should.be.a('object');
        res.should.be.json;
        done();
      });
  });
// -->> 4
  it('Response should be 200 with an UPDATE request', function(done) {
    const item = new TodoItem({
      name: 'Ma tache',
      status: 'inProgress'
    });
    const param = {
      name: 'Ma tache updated',
      status: 'done'
    };
    item.save(() => {
      chai.request(server)
        .put('/todoitems/' + item._id)
        .send(param)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          res.should.be.json;
          TodoItem.find({}, (err, items) => {
            items[0].name.should.eql(param.name);
            items[0].status.should.eql(param.status);
            done();
          });
        });
    });
  });
// -->> 5
  it('Response should be 200 with a DELETE request', function(done) {
    const aTodoItem = new TodoItem({
      name: 'firstTask',
      status: 'inProgress'
    });
    aTodoItem.save((err, savedTodoItem) => {
      chai.request(server)
        .delete('/todoitems/' + savedTodoItem._id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          TodoItem.find({}, (err, res) => {
            res.length.should.eql(0);
          });
          done();
        });
    });
  });
// -->> 6
  it('Response should be a JSON with a POST request', function(done) {
    const param = {
      name: 'Ma tache',
      status: 'done'
    };
    chai.request(server)
      .post('/todoitems')
      .send(param)
      .end(function(err, res) {
        expect(res).to.be.json;
        expect(res.body.name).to.equal('Ma tache');
        expect(res.body.status).to.equal('done');
        done();
      });
  });
});
