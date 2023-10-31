//To install: npm i fitness-health-calculations
//To use: const caloricNeeds = require('fitness-health-calculations');
const caloricNeeds = require('fitness-health-calculations');

'use strict';

/**Calculates the basal metabolic rate.
 * @param {String} gender
 * @param {Number} age
 * @param {Number} height
 * @param {Number} weight 
 */
module.exports.bmr = function bmr(gender, age, height, weight) {

    let heightConverted = height;
    let weightConverted = weight;
    let genderVariable;

    if (typeof age !== 'number' || typeof height !== 'number' || typeof weight !== 'number') {
        throw new Error('Age, height and weight must be a number');
    }

    /**Convert IMPERIAL UNITS */
    if(height < 10){
        heightConverted = height*30.48;
        weightConverted = weight/2.205;
    }

    /**Gender check */
    if (gender === 'female') {
        genderVariable = -161;
    } else if (gender === 'male') {
        genderVariable = 5;
    } else {
        throw new Error('Gender must be either male or female');
    }

    let bmr = 10 * weightConverted + 6.25 * heightConverted - 5 * age + genderVariable;

    /**Return bmr with two decimal places */
    return bmr = +bmr.toFixed(2);
}

/**Calculates the total daily energy expenditure.
 * @param {String} gender
 * @param {Number} age
 * @param {Number} height
 * @param {Number} weight
 * @param {String} activity_level 
 */
module.exports.tdee = function tdee(gender, age, height, weight, activity_level) {

    let activityMap = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'high': 1.725,
        'extreme': 1.9
    }

    if (typeof activity_level !== 'string' || !(activity_level in activityMap)) {
        throw new Error('Value for activity level is not valid')
    }

    let tdee = this.bmr(gender, age, height, weight) * activityMap[activity_level];

    /**Return tdee with two decimal places */
    return tdee = +tdee.toFixed(2);
}

/**Calculates the total daily caloric needs.
 * @param {String} gender
 * @param {Number} age
 * @param {Number} height
 * @param {Number} weight
 * @param {String} activity_level
 * @param {String} goal
 * @param {String} [approach='normal']
 */
module.exports.caloricNeeds = function caloricNeeds(gender, age, height, weight, activity_level, goal, approach = 'normal') {

    let goalMap = {
        'reduction': -200,
        'maintain': 0,
        'gain': 200
    }

    let approachMap = {
        'slow': -0.75,
        'normal': 1,
        'agressive': 2,
        'very agressive': 3
    }

    if (!(goal in goalMap)) {
        throw new Error('Value for goal is not valid')
    }

    if (!(approach in approachMap)) {
        throw new Error('Value for approach is not valid')
    }

    let tdee = this.tdee(gender, age, height, weight, activity_level);

    let calNeeds = tdee + (goalMap[goal] * approachMap[approach]);

    /**Return caloric needs with two decimal places */
    return calNeeds = +calNeeds.toFixed(2);
}

/**Calculates the ideal weight.
 * @param {Number} height
 * @param {String} gender
 * @param {String} [units = 'metric']
 */
module.exports.idealBodyWeight = function idealBodyWeight(height, gender, units = 'metric'){
    
    if(typeof height !== 'number'){
        throw new Error('Height must be a number')
    }
    
    let genderFactor = 50;
    let heightVal = height;

    /**Gender check */
    if (gender === 'female') {
        genderFactor = genderFactor - 5;
    } else if (gender === 'male') {
        
    } else {
        throw new Error('Gender must be either male or female');
    }

    if(height > 10){
        heightVal = height / 30.48;
    }

    let result = genderFactor + (((heightVal - 5) * 12) * 2.3);
    result = +result.toFixed(2);

    if(units === 'metric'){
        return result;
    }else if(units === 'imperial'){
        let imperialResult = result * 2.20;
        return +imperialResult.toFixed(2);
    }else{
        return new Error('Units parameter can only be metric or imperial');
    }
}