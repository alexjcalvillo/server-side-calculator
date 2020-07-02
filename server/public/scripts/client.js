$(document).ready(init);
let calcType = null;

function init() {
  console.log('jquery is loaded');
  for (let i = 0; i < 4; i++) {
    $('button').eq(i).on('click', { value: i }, setMathType);
  }
  $('#js-calculate').on('click', submitMath);
  $('#js-clear').on('click', reset);
}

function setMathType(event) {
  calcType = $(this).data();
  calcType = calcType.math;
}

function submitMath() {
  console.log('calculating');
  const equation = {
    firstNum: $('#js-first-number').val(),
    secondNum: $('#js-second-number').val(),
    calcType,
  };
  console.table(equation);
  // post this data to the server
  $.ajax({
    type: 'POST',
    url: '/calculate',
    data: equation,
  }).then((response) => {
    console.log('Post response ', response);
  });
}

function reset() {
  $('#js-first-number').val('');
  $('#js-second-number').val('');
}
