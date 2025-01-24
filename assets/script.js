$(document).foundation();

// gets user input elements
const sleepIntakeEl = document.getElementById('sleep-intake')
const waterIntakeEl = document.getElementById('water-intake')
const foodIntakeEl = document.getElementById('food-intake')

const cardioInputEl = document.getElementById('cardio-input')
const weightsInputEl = document.getElementById('weights-input')


// gets user selections
foodSlectorEle = document.getElementById('food-selector')
cardioSelectorEle = document.getElementById('cardio-selector')
weightsSelectorEle = document.getElementById('weights-selector')

// store calories eaten and burned
let totalCalsEaten = 0
let totalCalsBurned = 0

const compareValues = () =>{
    // get amout of /food/excercise
    const gramOfFood = foodIntakeEl.value
    const minutesOfCardio = cardioInputEl.value
    const minutesOfWeights = weightsInputEl.value

    // get type of food/excercise
    const typeOfFood = foodSlectorEle.value
    const typeOfCardio = cardioSelectorEle.value
    const typeOfWeights = weightsSelectorEle.value

    if(sleepIntakeEl.value === '' || waterIntakeEl.value === '' || foodIntakeEl.value === '' || cardioInputEl.value === '' || weightsInputEl.value === ''){
        $('#error-1').foundation('reveal', 'open')
    }

    if(typeOfFood && foodIntakeEl.value === '' || typeOfCardio && cardioInputEl.value === '' || typeOfWeights && weightsInputEl.value === ''){
        $('#error-2').foundation('reveal', 'open')
    }

    let calories;
    let caloriesBurned;

    // calculate calories eaten
    switch(typeOfFood){
        case 'Meat':
            calories = gramOfFood * 6.5
            break;
        case 'Vegetables':
            calories = gramOfFood * 5
            break;
        case 'fats':
            calories = gramOfFood * 9
            break;
        case 'sugars':
            calories = gramOfFood * 4
        default:
            break;
    }
    totalCalsEaten += calories

    // calculate calories burned
    switch(typeOfCardio){
        case 'Walking':
            caloriesBurned = minutesOfCardio * 6
            break;
        case 'Running':
            caloriesBurned = minutesOfCardio * 14
            break;
        case 'Swimming':
            caloriesBurned = minutesOfCardio * 6.5
            break;
        case 'Jumprope':
            caloriesBurned = minutesOfCardio * 15
            break;        
        default:
            break;
    }
    totalCalsBurned += caloriesBurned

    switch(typeOfWeights){
        case 'Bench Press':
            caloriesBurned = minutesOfWeights * 5
            break;
        case 'Squats':
            caloriesBurned = minutesOfWeights * 8
            break;
        case 'Deadlift':
            caloriesBurned = minutesOfWeights * 7
            break;
        default:
            break;
    }
    totalCalsBurned += caloriesBurned
}