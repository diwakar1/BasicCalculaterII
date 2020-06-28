//create class
class Calculator{
  constructor(previousOperandTextElement,currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
    }
//it clears 
    clear(){
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    }
//it deletes from the current right number
    delete(){
      this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
// it apends int the screen
    appendNumber(number){
      if(number==='.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString()+number.toString();
      
    }
    // it does for operation 
    chooseOperation(operation){
      //if(this.currentOperand==='')return;
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand =' ';
      if(this.previousOperand !== ''){
        this.compute();
      }

    }

    // it computes the value
    compute(){
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if(isNaN(prev) || isNaN(current))return
      switch(this.operation){
        case '+':
        computation = prev + current;
        break;
        case '-':
        computation = prev - current;
        break;
        case '/':
        computation = prev / current;
        break;
        case '*':
        computation = prev * current;
        break;
        default:
          return;
      }
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand ='';

    }
// it does formatting of displayed  number in the screen.
    getDisplayNumber(number){
      // const floatNumber = parseFloat(number);
      // if(isNaN(floatNumber)) return '';
      // return floatnNumber.toLocaleString('en');
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];
      let integerDisplay 
      if(isNaN(integerDigits)){
        integerDisplay = '';
      }else{
        integerDisplay = integerDigits.toLocaleString('en',{
          maximumFractionDigits:0
        })
      }
      if(decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
      }else{
        return integerDisplay;
      }
      
    }
    //it displays numbers in the output screen.
    updateDisplay(){
      this.currentOperandTextElement.textContent= this.getDisplayNumber(this.currentOperand);
      this.previousOperandTextElement.style.color= 'white';
      this.previousOperandTextElement.style.fontSize= '16px';
      this.currentOperandTextElement.style.color= 'white';
      this.currentOperandTextElement.style.fontSize= '16px';
      if(this.operation != null){
        this.previousOperandTextElement.textContent= `${this.previousOperand} ${this.operation}`;

      }else{

        this.previousOperandTextElement.textContent='';
      }


    }
}
// used dom elements 
let numberButtons = document.querySelectorAll('[data-number]');
let operationButtons = document.querySelectorAll('[data-operation]');
let equalButton = document.querySelector('[data-equal]');
let deleteButton = document.querySelector('[data-delete]');
let allClearButton = document.querySelector('[data-reset]')
let previousOperandTextElement = document.querySelector('.prev-operand');
let currentOperandTextElement = document.querySelector('.curr-operand');


//create object
let calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

//once you press the number button  it fires the function appendNumber 
numberButtons.forEach(button=>{
  button.addEventListener('click',()=>{
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
  })
})
//once user click operation 
operationButtons.forEach(button=>{
  button.addEventListener('click',()=>{
    calculator.chooseOperation(button.textContent);
    calculator.updateDisplay();
  })
})

//once user click equal button
equalButton.addEventListener('click',()=>{
  calculator.compute();
  calculator.updateDisplay();
})
//once user clicks clear button
allClearButton.addEventListener('click',()=>{
  calculator.clear();
  calculator.updateDisplay();
})
// once user clicks delete button
deleteButton.addEventListener('click',()=>{
  calculator.delete();
  calculator.updateDisplay();
})
