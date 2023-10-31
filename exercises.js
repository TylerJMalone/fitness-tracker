const request = require('request');
var muscle = 'biceps';
request.get({
  url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
  headers: {
    'X-Api-Key': 'Xb/8y5d1vpgSJrMT3IJR3w==xkE9qZbCraaAFbxJ'
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
});

//Parameters
//name (optional) - name of exercise. This value can be partial (e.g. press will match Dumbbell Bench Press)

//type (optional) - exercise type. Possible values are:

//cardio
//olympic_weightlifting
//plyometrics
//powerlifting
//strength
//stretching
//strongman
//muscle (optional) - muscle group targeted by the exercise. Possible values are:

//abdominals
//abductors
//adductors
//biceps
//calves
//chest
//forearms
//glutes
//hamstrings
//lats
//lower_back
//middle_back
//neck
//quadriceps
//traps
//triceps
//difficulty (optional) - difficulty level of the exercise. Possible values are:

//beginner
//intermediate
//expert