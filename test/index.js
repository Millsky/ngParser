/**
 * Created by millsky on 4/13/17.
 */
/* TEST FOR THE SHUNTING-YARD ALGORITHM */
var chai = require('chai');
var assert = chai.assert;

/* Hackish workaround to load in plain JS Module */
eval(require('fs').readFileSync('./js/mathParser.js', 'utf8'));


describe('mathParser', function() {
    /* TEST ADDITION */
   it('Should return 2 when the value is 1+1',function () {
       var result = mathParser('1+1');
       assert.equal(result,2);
       result = mathParser('1+ 1 ');
       assert.equal(result,2);
   });
    it('Should return 1002 when the value is 1000+1+1',function () {
        var result = mathParser('1000+1+1');
        assert.equal(result,1002);
        result = mathParser('1000+  1 + 1');
        assert.equal(result,1002);
    });
   /* SUBTRACTION */
   it('Should return 8 when the value is 9-1',function () {
       var result = mathParser('9-1');
       assert.equal(result,8);
   });
   it('Should return 108 when the value is 110-2',function () {
        var result = mathParser('110-2');
        assert.equal(result,108);
    });
   /* MULTIPICATION */
   it('Should return 25 when the value is 5*5',function () {
        var result = mathParser('5*5');
        assert.equal(result,25);
    });
    it('Should return 200 when the value is 10*10*2',function () {
        var result = mathParser('10*10*2');
        assert.equal(result,200);
    });
   /* DIVISION */
    it('Should return .5 when the value is 1/2',function () {
        var result = mathParser('1/2');
        assert.equal(result,.5);
    });
    it('Should return 100 when the value is 200/2',function () {
        var result = mathParser('200/2');
        assert.equal(result,100);
    });
    /* ADDITION AND DIVISION */
    it('Should return 2.5 when the value is 1+1/2+1',function () {
        var result = mathParser('1+1/2+1');
        assert.equal(result,2.5);
    });
    /* ADDDITION DIVISION MULTIPICATION */
    it('Should return 6.5 when the value is 1+1/2+1*5',function () {
        var result = mathParser('1+1/2+1*5');
        assert.equal(result,6.5);
    });
    /* ADDDITION DIVISION MULTIPICATION SUBTRACTION */
    it('Should return 3 when the value is 1*4+1-8/2+1',function () {
        var result = mathParser('1*4+1-8/2+1');
        assert.equal(result,2);
    });
    /* NEGATIVE CASES */
    it('Should return false when value is a+1',function () {
        var result = mathParser('a+1');
        assert.equal(result,false);
    });
    /* Negative test for valid chars */
    it('Should return false when value is 1++',function () {
        var result = mathParser('1++');
        assert.equal(result,false);
    });
    /* Negative test for special chars */
    it('Should return false when value is 1+!',function () {
        var result = mathParser('1+!');
        assert.equal(result,false);
    });

});