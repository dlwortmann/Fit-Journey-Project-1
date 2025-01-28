$(document).foundation();

// gets user inputs
const date = document.getElementById('date').value
const hoursOfSleep = document.getElementById('sleep-intake').value
const ouncesOfWater = document.getElementById('water-intake').value
const ouncesOfFood = document.getElementById('food-intake').value
const minutesOfCardio = document.getElementById('cardio-input').value
const minutesOfWeights = document.getElementById('weights-input').value


// gets user selections
typeOfFood = document.getElementById('food-selector').value
typeOfCardio = document.getElementById('cardio-selector').value
typeOfWeights = document.getElementById('weights-selector').value


let graphData = []

const compareValues = () =>{
    // open error message
    if(!date){
        $('error-1').foundation('reveal', 'open')
        return;
    }
    
    if(!hoursOfSleep && !ouncesOfWater && !ouncesOfFood && !minutesOfCardio && !minutesOfWeights){
        $('#error-2').foundation('reveal', 'open')
        return;
    }
    
    if(typeOfFood && !ouncesOfFood || typeOfCardio &&  !minutesOfCardio || typeOfWeights && !minutesOfWeights){
        $('#error-3').foundation('reveal', 'open')
        return;
    }
    
    if(!typeOfFood && ouncesOfFood || !typeOfCardio &&  minutesOfCardio || !typeOfWeights && minutesOfWeights){
        $('#error-4').foundation('reveal', 'open')
        return;
    }

    let calories = 0;
    let caloriesBurned = 0;
    // store calories eaten and burned
    let totalCalsEaten = 0
    let totalCalsBurned = 0
    
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

    return totalCalsEaten
    return totalCalsBurned
}

const compileData = () => {
    
}