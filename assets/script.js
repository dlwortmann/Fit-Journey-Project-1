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


const getValues = () =>{
    // get amout of slee/water/food/excercise
    const hrOfSleep = sleepIntakeEl.value
    const ozOfWater = waterIntakeEl.value
    const gramOfFood = foodIntakeEl.value
    const minuteOfCardio = cardioInputEl.value
    const minutesOfWeights = weightsInputEl.value

    // get type of food/excercise
    const typeOfFood = foodSlectorEle.value
    const typeOfCardio = cardioSelectorEle.value
    const typeOfWeights = weightsSelectorEle.value