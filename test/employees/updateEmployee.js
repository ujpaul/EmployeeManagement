import ENV from 'dotenv';
import chai from 'chai';
import { describe, it } from 'mocha';
import http from 'chai-http';
import jwt from 'jsonwebtoken';
import mockData from '../mockData/mockData';
import app from '../../server';

ENV.config();
chai.use(http);
chai.should();

describe('when manager is trying to update an employee ', () => {
  it('should not be able to update if no token provided', (done) => {
    chai.request(app)
      .put('/employees/1')
      .send({
        employeeName: 'Divine Manzi Updated',
        nationalID: '2782382848238284',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  const token = jwt.sign(mockData, process.env.JWT_KEY, { expiresIn: '365d' });

  it('should not be able to update if there is an error in inputs', (done) => {
    chai.request(app)
      .put('/employees/1')
      .set('x-auth-token', token)
      .send({
        employeeName: '',
        nationalID: '2782382848238284',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to update if NID is not provided', (done) => {
    chai.request(app)
      .put('/employees/1')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Diane',
        nationalID: '',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to update if Phone is not provided', (done) => {
    chai.request(app)
      .put('/employees/1')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Divine',
        nationalID: '2782382848238284',
        phoneNumber: '',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to update if email is not provided', (done) => {
    chai.request(app)
      .put('/employees/1')
      .set('x-auth-token', token)
      .send({
        employeeName: 'John',
        nationalID: '2782382848238284',
        phoneNumber: '0781429268',
        email: '',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to update if DOB is not provided', (done) => {
    chai.request(app)
      .put('/employees/1')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Kamikazi',
        nationalID: '2782382848238284',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to update if status is not provided', (done) => {
    chai.request(app)
      .put('/employees/1')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Ange',
        nationalID: '2782382848238284',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '01.01.2000',
        status: '',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not be able to update if postion is not provided', (done) => {
    chai.request(app)
      .put('/employees/1')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Anne',
        nationalID: '2782382848238284',
        phoneNumber: '0781429268',
        email: 'divineufitihirwe@gmail.com',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: ''
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });


  it('should not be able to update if an employee is not available', (done) => {
    chai.request(app)
      .put('/employees/800')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Divine',
        nationalID: '2782382848238280',
        phoneNumber: '0781429260',
        email: 'divineufitihirwe10@gmail.com',
        dateOfBirth: '01.01.200',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should  be able to update if an employee is found and a request is from manager ', (done) => {
    chai.request(app)
      .put('/employees/2')
      .set('x-auth-token', token)
      .send({
        employeeName: 'Divine Manzi Updated',
        nationalID: '2782382848000000',
        phoneNumber: '0781000000',
        email: 'divineufitihirwe90@gmail.com',
        dateOfBirth: '01.01.2000',
        status: 'active',
        position: 'developer'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('message');
        res.body.should.have.property('UserInfo');
        done();
      });
  });
});
