$(document).ready(init);
let calcType = null;
const equation = {};

function init() {
  console.log('jquery is loaded');
  for (let i = 0; i < 4; i++) {
    $('button').eq(i).on('click', { value: i }, setMathType);
  }
  $('#js-calculate').on('click', submitMath);
  $('#js-clear').on('click', reset);
}

function setMathType(event) {
  console.log($(this).data());
  calcType = $(this).data();
  calcType = calcType.math;
}

function submitMath() {
  console.log('calculating');
  equation = {
    firstNum: $('#js-first-number').val(),
    secondNum: $('#js-second-number').val(),
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
  $('#js-first-number').val('');
  $('#js-second-number').val('');
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
