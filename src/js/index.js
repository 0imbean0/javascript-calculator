const calculator = document.querySelector('.calculator');
const total = document.querySelector('#total');
let firstOperand = null;
let secondOperand = null;
let operator = '';
let isClickedOperator = false;

const computeOperation = (operator) => {
  if (operator === '+') return firstOperand + secondOperand;
  else if (operator === '-') return firstOperand - secondOperand;
  else if (operator === 'X') return firstOperand * secondOperand;
  else if (operator === '/') return Math.floor(firstOperand / secondOperand);
  else return NaN;
};

const saveFirstOperand = () => {
  firstOperand = Number(total.innerText);
  isClickedOperator = false;
  total.innerText = '';
};

const addClickedOperationClassName = (operator) => {
  const operationOrder = {
    '/': 1,
    X: 2,
    '-': 3,
    '+': 4,
    '=': 5,
  };

  document
    .querySelector(`.operation:nth-child(${operationOrder[operator]})`)
    ?.classList.add('clicked-operation');
};

const removeClickedOperationClassName = () =>
  document
    .querySelector('.clicked-operation')
    ?.classList.remove('clicked-operation');

const handleClickModifier = () => {
  firstOperand = null;
  secondOperand = null;
  operator = '';
  isClickedOperator = false;
  total.innerText = 0;

  removeClickedOperationClassName();
};

const handleClickDigit = (clickedDigit) => {
  if (isClickedOperator) {
    saveFirstOperand();
    removeClickedOperationClassName();
  }

  if (total.innerText.length === 3) {
    alert('3자리 이하의 숫자를 입력해주세요.');

    return;
  }

  total.innerText = Number(total.innerText) * 10 + clickedDigit;
};

const handleClickEqualityOperator = () => {
  // firstOperand만 입력된 상태
  if (operator === '') {
    alert('연산자를 선택해주세요.');

    return;
  }
  // firstOperand, operator 까지 입력된 상태
  if (isClickedOperator) {
    alert('두번째 숫자를 입력해주세요.');

    return;
  }

  // firstOperand, operator, secondOperand, = 까지 입력된 상태
  addClickedOperationClassName('=');
  secondOperand = Number(total.innerText);
  total.innerText = computeOperation(operator);
};

const handleClickArithmeticOperator = (clickedOperator) => {
  // firstOperand, operator, secondOperand 가 입력된 상태
  // -> "="이 클릭되어야 하는데, 다른 연산자가 클릭되었을때
  if (firstOperand !== null) {
    alert('2개의 숫자에 대한 계산만 가능합니다.');

    return;
  }

  removeClickedOperationClassName();
  addClickedOperationClassName(clickedOperator);

  operator = clickedOperator;
  isClickedOperator = true;
};

const handleClickOperation = (clickedOperator) => {
  if (clickedOperator === '=') handleClickEqualityOperator();
  else handleClickArithmeticOperator(clickedOperator);
};

calculator.addEventListener('click', (e) => {
  const { className, innerText } = e.target;

  if (className === 'modifier') {
    handleClickModifier();
  }

  if (secondOperand !== null) {
    alert('AC를 눌러 초기화를 해주세요.');

    return;
  }

  if (className === 'digit') {
    handleClickDigit(Number(innerText));
  }

  if (className === 'operation') {
    handleClickOperation(innerText);
  }
});
