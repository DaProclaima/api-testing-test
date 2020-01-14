var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);

chai.request('http://127.0.0.1:3000').send({
  "name":"Ma tache ",
  "status":"inProgress" }).end(function (err, res) {
  expect(err).to.be.null;
  expect(res).to.have.status(200);
});
