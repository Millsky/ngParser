# ngParser
### A partial implementation of the Shunting-yard algorithm

## The problem description: 

Create an AngularJS directive that includes a text input element. Any text the user enters should be analyzed and a response output onto the page. The input should accept simple equations, such as "2 + 3 / 2" and then output the appropriate answer, paying attention to the order of operations (multiplication or division left to right, then addition or subtraction left to right). +, -, /, *, and optional spaces are the only symbols that need to be accepted, and you cannot use the eval function or anything similar. If the input is not valid, the output text should change to indicate this to the user. Include a file called explanation.md that describes how your code works and explains your reasoning. Inline comments and tests are also encouraged. All code should be written by you, so do not use an Angular Seed project. 

### Requirements

1.) Per "Any text the user enters should be analyzed and a response output onto the page" The system must trigger the parse process on keyup and give the user live feedback. 

2.) The system shall allow for the input of simple equations:

2a.) A simple equation shall be defined as an equation that does not contain parenthesis or operators not outlined in requirement 2b.

2b.) +, -, /, *

3.) The system shall display a message to the user indicating an incorrect input after the event defined in 1.

4.) The system shall not evaluate formulas using the eval function. 

5.) The system shall be able to evaluate n digit POSITIVE numbers

## Thought process: 

### The parsing algorithm

My initial thoughts were that the requirements matched how computers parsers already function so it 
would be wise to see how parsers operate behind the scenes. Which led me to abstract syntax trees and 
eventually a relatively clean solution using stacks via the shunting-yard algorithm to convert the users 
input to post-fix notation. 

Since the requirements did not specify the need for accepting parenthesis and due to time constraints I
constructed the algorithm without taking parenthesis into consideration. 

#### Error Handling

Since we had a relatively small set of chars that were acceptable as user input I created a regex expression 
to check if the input contained only whitelisted chars. 

### The angular application

The second part was to create the angular application that would act as the UI for the algorithm. A directive was 
created that used the exported function from mathParser.js. 

"If the input is not valid, the output text should change to indicate this to the user."

Here we should note that the output text should change - NOT show an additional error message. To achieve this I used 
angular hide and show as the ng-if directive: "The ngIf directive removes or recreates a portion of the DOM tree " - per: https://docs.angularjs.org/api/ng/directive/ngIf
We do not want to do this as this would cause a performance impact as opposed to simply repainting with the ng-hide/show alternative.
 
 
## Installation

Simply run npm intall this will install all test dependencies needed. (mocha,chai) and their dependents. 

## Running tests 

npm test 



