$(document).foundation();

// gets user inputs
const dateEl = document.getElementById('date')
const hoursOfSleepEl = document.getElementById('sleep-intake')
const ouncesOfWaterEl = document.getElementById('water-intake')
const ouncesOfFoodEl = document.getElementById('food-intake')
const minutesOfCardioEl = document.getElementById('cardio-input')
const minutesOfWeightsEl = document.getElementById('weights-input')
const ouncesOfFood = ouncesOfFoodEl.value
const minutesOfCardio = minutesOfCardioEl.value
const minutesOfWeights = minutesOfWeightsEl.value


// gets user selections
const typeOfFoodEl = document.getElementById('food-selector')
const typeOfCardioEl = document.getElementById('cardio-selector')
const typeOfWeightsEl = document.getElementById('weights-selector')

// store calories eaten and burned
let totalCalsEaten = 0
let totalCalsBurned = 0

let graphData = []

const compareValues = () =>{
    // get values
    const typeOfFood = typeOfFoodEl.value
    const typeOfCardio = typeOfCardioEl.value
    const typeOfWeights = typeOfWeightsEl.value

    //open error message
    //if(!day){
    //  $('error-1').foundation('reveal', 'open')
    //return;
    // } day is not defined at this point, don't have a day input in the HTML

    let calories = 0;
    let caloriesBurned = 0;
    // reset totals
    totalCalsEaten = 0
    totalCalsBurned = 0
    
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

const showErrors = () => {
    if(!hoursOfSleepEl.value && !ouncesOfWaterEl.value && !ouncesOfFoodEl.value && !minutesOfCardioEl.value && !minutesOfWeightsEl.value){
        $('#error-2').foundation('open');
        return;
    }
    else if(typeOfFoodEl.Value && !ouncesOfFoodEl.value || typeOfCardioEl.value &&  !minutesOfCardioEl.value || typeOfWeightsEl.value && !minutesOfWeightsEl.Value){
        $('#error-3').foundation('open');
        return;
    }
    else if(!typeOfFoodEl.value && ouncesOfFoodEl.value || !typeOfCardioEl.Value &&  minutesOfCardioEl.value || !typeOfWeightsEl.value && minutesOfWeightsEl.value){
        $('#error-4').foundation('open');
        return;
    }
    else{
        return;
    }
}

const compileData = () => {
    const day = new Date().getDay()
    const hoursOfSleep = hoursOfSleepEl.value
    const ouncesOfWater = ouncesOfWaterEl.value

    const dataObject = {
        day: day,
        sleep: hoursOfSleep,
        water: ouncesOfWater,
        calsEaten: totalCalsEaten,
        calsburned: totalCalsBurned
    }

    graphData.push(dataObject)

    while(graphData.length > 7){
        graphData.shift()
    }

    localStorage.setItem('graphData', JSON.stringify(graphData))
}


const xValues = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const buildGraphs = () =>{
    const tempItem = JSON.parse(localStorage.getItem('graphData')) || []
    const days = []
    const sleep = []
    const water = []
    const calsIn = []
    const calsOut = []
    
    if (!tempItem[0]){
        return;
    }    

    for(i=0; i<tempItem.length; i++) {
        days.push(tempItem[i].day);
        sleep.push(tempItem[i].sleep);
        water.push(tempItem[i].water);
        calsIn.push(tempItem[i].calsEaten);
        calsOut.push(tempItem[i].calsBurned);
    }

    new Chart("sleep-graph", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                data: sleep,
                borderColor: '#cf7c1e',
                fill: false
            }]
        },
            options: {
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Hours Slept'
                        }
                    }
                },
                legend: {display: false},
            }
    });
    
    new Chart("water-graph", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                data: water,
                borderColor: '#cf7c1e', 
                fill: false
            }]
        },
            options: {
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Ounces of Water'
                        }
                    }
                },
                legend: {display: false},
            }
    });
     
    
    new Chart("food-graph", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                data: calsIn,
                borderColor: '#cf7c1e',
                fill: false
            }]  
        }, 
            options:{
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Caloric Intake'
                        }
                    }
                },
                legend: {display: false}
        }       
      });
    
    new Chart("exercise-graph", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                data: calsOut,
                borderColor: '#cf7c1e',
                fill: false
            }]
        },
            options:{
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Calories Burned'
                        }
                    }
                },
                legend: {display: false}
        }
    });
}

//submit button function
const submitButton = document.querySelector('.data-box input[type="submit"]');
submitButton.addEventListener('click', function(event){
    event.preventDefault();

    compareValues();
    showErrors()
    compileData();
    buildGraphs();
});

//calling above functions and console logging for confirmation
compareValues() 
console.log("compareValues called");
compileData()
console.log("compileData called");
buildGraphs()
console.log("buildGraphs called");

// Line Chart Syntax 
// const sleepValues = sleep.push(tempItem[i].sleep)
// const waterValues = water.push(tempItem[i].water)
// const calsInValues = calsIn.push(tempItem[i].calsEaten)
// const calsOutValues = calsOut.push(tempItem[i].calsBurned)
// const yValue = [7,9,10,11,14,14,15]; //Placeholder values until function is completed.