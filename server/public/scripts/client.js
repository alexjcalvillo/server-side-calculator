$(document).ready(init);
let calcType = '';
let inputValue1 = '';
let inputValue2 = '';

function init() {
  console.log('jquery is loaded');
  for (let i = 0; i < 14; i++) {
    $('button').eq(i).on('click', { value: i }, setMathType);
  }

  //   $('.js-button-selector').on('click', (event) => {
  //     console.log($(this).data());
  //     // if ($(this).data() === '+' || '-' || '/' || '*') {
  //     //   calcType = $(this).data().math;
  //     //   console.log(calcType);
  //     // } else {
  //     //   console.log($(this).data('math'));
  //     // }
  //   });

  $('#js-calculate').on('click', submitMath);
  $('#js-clear').on('click', reset);
}

function setMathType(event) {
  //   calcType = $(this).data();
  //   calcType = calcType.math;
  //   console.log(calcType);
  let value = $(this).data().math;
  console.log(value);
  switch (value) {
    case '+':
      calcType = value;
      break;
    case '-':
      calcType = value;
      break;
    case '/':
      calcType = value;
      break;
    case '*':
      calcType = value;
      break;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      if (calcType === '') {
        inputValue1 = value;
      } else {
        inputValue2 = value;
      }
    default:
      break;
  }
  renderInputs();
}

function submitMath() {
  console.log('calculating');
  const equation = {
    firstNum: inputValue1,
    secondNum: inputValue2,
    calcType,
  };

  if (
    equation.firstNum == '' ||
    equation.secondNum == '' ||
    equation.calcType == ('' || null)
  ) {
    alert('Not a complete equation.');
    return;
  }
  console.table(equation);
  // post this data to the server
  $.ajax({
    type: 'POST',
    url: '/calculate',
    data: equation,
  }).then((response) => {
    console.log('Post response ', response);
    // get back the transformed data from server
    getCalculation();
  });
}

function reset() {
  inputValue1 = '';
  inputValue2 = '';
  calcType = '';
}

function getCalculation() {
  // get back data from the server transformed
  $.ajax({
    type: 'GET',
    url: '/calculate',
  }).then((response) => {
    console.log('GET - response', response);
    render(response);
  });
}

function render(calcWithAnswer) {
  // TODO: display stuff on html screen
  console.log(calcWithAnswer);
  $('#js-answer').empty();
  $('#js-answer').append(`
    <p>Answer: ${calcWithAnswer[calcWithAnswer.length - 1].answer}</p>
    `);
  $('#js-history').empty();
  for (let i = 0; i < calcWithAnswer.length; i++) {
    $('#js-history').append(`
        <li>${calcWithAnswer[i].firstNum} ${calcWithAnswer[i].calcType} ${calcWithAnswer[i].secondNum} = ${calcWithAnswer[i].answer}</li>
        `);
  }
}

function renderInputs() {
  console.log('in renderInputs');
  $('#js-first-number').empty();

  $('#js-first-number').append(`
  <p>${inputValue1} ${calcType} ${inputValue2}</p>
  `);
}

function createInput1() {}
