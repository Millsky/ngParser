/**
 * Created by millsky on 4/11/17.
 */

/* WRAP - No need to pollute the global scope */
var mathParser = (function () {

    /*  a.) Tokenize the inputs -> JS We can just split and get an array */
    function tokenize(stringExpression) {
        /* Remove whitespaces */
        stringExpression = stringExpression.replace(/ /g,'');
        return stringExpression.split('');
    }

    /* Utility to Check if token is valid */
    var tokens = ["+","-","*","/"];

    /* utility to map priorities P|E|MD|AS */
    var tokenPriority = {
        "+":1,
        "-":1,
        "*":2,
        "/":2
    };
    /* utility to map functions */
    var tokenFunction = {
        "+": function (a,b) {
            return a+b;
        },
        "-":function (a,b) {
            return a-b;
        },
        "*":function (a,b) {
            return a*b;
        },
        "/":function (a,b) {
            return a/b;
        }
    };

    /* Utility function to check if token is a valid operation +,-/ etc. */
    function isValidToken(t) {
        return tokens.indexOf(t) >= 0;
    }

    /*c.) Utility function to check if input is a number
     we can extend this later if needed */
    function isNumber(n) {
        return !isNaN(n);
    }


    /* https://en.wikipedia.org/wiki/Reverse_Polish_notation */
    /* Achieved via: https://en.wikipedia.org/wiki/Shunting-yard_algorithm */
    function convertToPostFix(stringExporession) {
        /* Stack for operators */
        var ops = [];
        /* Tokenize the passed in string*/
        var tokenizedExpression = tokenize(stringExporession);
        /* Init an empty stack*/
        var output = [];
        /* We can follow the impl on wiki less the parens */
        for(var i=0;i<tokenizedExpression.length;i++){
            var currentToken = tokenizedExpression[i];
            if(isNumber(currentToken)){
                output.push(currentToken);
            }else{
                if(isValidToken(currentToken)){
                    output.push(" ");
                    var currentPriority = tokenPriority[currentToken];
                    var index = ops.length;
                    /* Iterate backwards to push out old ops with a lower priority */
                    while(index--){
                        var currentOp =  ops[index];
                        var opsPriority = tokenPriority[currentOp];
                        if(opsPriority >= currentPriority){
                            var item = ops.splice(index,1);
                            output.push(item[0]);
                            output.push(" ");
                        }

                    }
                    ops.push(currentToken);
                }
            }
        }

        /* There could be some left over ops whos priorities did not
        pop b/c they did not meet the priority criteria*/

        if(ops.length > 0){
            for(var i = ops.length - 1; i >= 0; i--){
                output.push(" ");
                output.push(ops[i]);
            }
        }
        return output;
    }

    /* Stack based evaluation of postfix notation: http://scriptasylum.com/tutorials/infix_postfix/algorithms/postfix-evaluation/*/
    function evaluatePostFixExpression(postFixArray) {
        postFixArray = postFixArray.join('').split(' ');
        ops = [];
        for(var i=0;i<postFixArray.length;i++){
            var currentToken = postFixArray[i];
            /* Check for empty in corner case */
            if(currentToken === ""){
                return false;
            }
            if(isNumber(currentToken)){
                ops.push(Number(currentToken));
            }else{
                    op2 = ops.pop();
                    op1 = ops.pop();
                    result = tokenFunction[currentToken](op1, op2);
                    ops.push(result);

            }
        }
        return ops.pop();
    }

    /* We can utilize regexhere to check for errors prior to evaluation
    * it is probably more efficient to catch errors during build of the postfix
    * that would be a todo less time constraints
    * */
    function expressionContainsErrors(stringExpression) {
        /* WHITE LIST CHARS WE ARE USING - User cannot input alphabetic chars or ! other unicode */
        var whiteList = new RegExp('[^0-9+-/* ]');
        return whiteList.test(stringExpression);
    }

    function parseMath(stringExpression) {
        if(expressionContainsErrors(stringExpression)){
            return false;
        }else{
            var result = evaluatePostFixExpression(convertToPostFix(stringExpression));
            /* Catch any exceptions we missed test case 1++*/
            if(isNaN(result)){
                return false
            }else {
                return result;
            }
        }
    }

    return parseMath;
})();