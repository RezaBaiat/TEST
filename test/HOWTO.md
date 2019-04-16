examples:  
https://www.tangentsolutions.co.za/2017/07/03/unit-testing-react-native-with-mocha-chai-sinon-enzyme-and-istanbul/
http://www.darrenbeck.co.uk/react/testing/testing-part1/


https://codeburst.io/javascript-unit-testing-using-mocha-and-chai-1d97d9f18e71
https://medium.com/the-web-tub/mocha-chai-js-unit-testing-for-es6-with-istanbul-code-coverage-11b2a141a446

<h1> Mocha </h1>  

- <b> assert </b> helps to determine the status of the test, it determines failure of the test

- <b> describe </b> is a function which holds the collection of tests. It takes two parameters, first one is the meaningful name to functionality under test and second one is the function which contains one or multiple tests. We can have nested describe as well.

- <b> it </b> is a function again which is actually a test itself and takes two parameters, first parameter is name to the test and second parameter is function which holds the body of the test.


<b>Test Assertion</b> 
- <b> Assertion </b> is an expression which helps system (Mocha in this case) to know code under test failed.
- <b> Assert's </b> job is to just throw an error when things are not correct or right.
- <b> Assert </b> tests the expression and it does nothing when expression passes but throws exception in case of failure to tell the test framework about it.
- We can just throw an exception to fail the test as well.


<b>Hooks like beforeEach and afterEach</b> 
- Few steps or code we might want to execute before or after each test to either setup preconditions before test or cleanup after test. so those code can be put inside beforeEach() and afterEach() methods.
- It is always good practice to have named function or description to hooks, which helps to identify errors quickly in tests.


````javascript

var assert = require('assert');
describe('Basic Mocha String Test', function () {
 it('should return number of charachters in a string', function () {
        assert.equal("Hello".length, 4);
    });
 it('should return first charachter of the string', function () {
        assert.equal("Hello".charAt(0), 'H');
    });
});

````

````javascript

function isValidUserIdAsync(userList, user, callback) {
    setTimeout(function(){
      callback(userList.indexOf(user) >= 0)
    }, 1);
}   
Note: setTimeout has been used to simulate the async behavior.
/* Test */
it('should return true if valid user id', function(done){
  loginController.isValidUserIdAsync(['abc123','xyz321'], 'abc123',
     function(isValid){
      assert.equal(isValid, true);
      done();
  });
});

````

````javascript
beforeEach('Setting up the userList', function(){
  console.log('beforeEach');
  loginController.loadUserList(['abc123','xyz321']);
});
describe('LoginController', function () {
...
}
````


<h1> Chai </h1>  

<b> Assertion interfaces and styles </b>

- The <b> excpect </b> interface provides function for assertion.
- The <b> should </b> interface extends each object with a should property for assertion.
- <b> should </b> property gets added to the Object.Prototype, so that all object can access it through prototype chain.

- <b> only() </b> method helps to run specific test or test-suite. we can have multiple only() in entire test-suite.

````javascript
var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
it('should return true if valid user id', function(){
      var isValid = loginController.isValidUserId('abc123')
      //assert.equal(isValid, true);
      expect(isValid).to.be.true;
});
it('should return false if invalid user id', function(){
      var isValid = loginController.isValidUserId('abc1234')
      //assert.equal(isValid, false);
      isValid.should.equal(false);
});
````
````javascript
var should = require('chai').should();
it('should have property name with value Figo', function(){
    var car = {name:'Figo', Maker:'Ford'};
    car.should.have.property('name').equal('Figo');
});
it('Checking for null', function(){
    var car = null;
    //car.should.not.exist; (Cannot read property 'should' of null)
    should.not.exist(car);
});
````
````javascript
describe('LoginController', function () {
  describe('isValidUserId', function(){
    it.skip('should return true if valid user id', function(){
      ...
    });
    it('should return false if invalid user id', function(){
      ...
    });
  });
  describe.skip('isValidUserIdAsync', function(){
    it('should return true if valid user id', function(done){
      ...    
    });
  });
});
````

````javascript
describe('LoginController', function () {
  describe('isValidUserId', function(){
    it.only('should return true if valid user id', function(){
      ...
    });
    it('should return false if invalid user id', function(){
      ...
    });
  });
  describe.only('isValidUserIdAsync', function(){
    it('should return true if valid user id', function(done){
      ...    
    });
  });
});
````