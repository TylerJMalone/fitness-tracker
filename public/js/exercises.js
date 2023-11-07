$(document).ready(function() {
  var resultContainer = $("#result-container");
  $("form").submit(function(event) {
    event.preventDefault();
    var muscle = $("#muscle").val();
    var name = $("#name").val();
    var type = $("#type").val();
    var difficulty = $("#difficulty").val();
    var instructions = $("#instructions").val();
    searchExercises(muscle, name, type, difficulty, instructions);
  });

  function searchExercises(muscle, name, type, difficulty, instructions) {
    $.ajax({
      url: 'https://api.api-ninjas.com/v1/exercises',
      headers: {
        'X-Api-Key': 'Xb/8y5d1vpgSJrMT3IJR3w==xkE9qZbCraaAFbxJ'
      },
      data: {
        muscle: muscle,
        name: name,
        type: type,
        difficulty: difficulty,
        instructions: instructions,
      },
      success: function(results) {
        console.log(results[0]);
        displayResults(results);
      },
      error: function(error) {
        console.error('Request failed:', error);
      }
    });
  }

  function displayResults(results) {
    resultContainer.empty();
    var favLink = $("<p>").text("Add to favorites");

    if (results.length == 0) {
      resultContainer.append("<p>No exercises found.</p>");
    } else {
      for (var i = 0; i < results.length; i++) {
        var exercise = results[i];
        var exerciseItem = $("<div>").addClass("exercise-item");
        var favLink = $("<p>").text("Add to favorites").addClass('fav-link');
        exerciseItem.append(favLink);
        exerciseItem.append($("<h2>").text(exercise.name));
        exerciseItem.append($("<p>").text("Type: " + exercise.type));
        exerciseItem.append($("<p>").text("Muscle: " + exercise.muscle));
        exerciseItem.append($("<p>").text("Difficulty: " + exercise.difficulty));
        exerciseItem.append($("<p>").text("Instructions: " + exercise.instructions));
        resultContainer.append(exerciseItem);
      }
    }
  }
  resultContainer.on('click', function getItem(e) {
    if(e.target.className === 'fav-link') {
      var textItems = e.target.parentNode.children;
      var nameString = `"name": "${textItems[1].innerHTML}"`;
      var typeString = `"type": "${textItems[2].innerHTML}"`;
      var muscleString = `"muscle": "${textItems[3].innerHTML}"`;
      var difficultyString = `"difficulty": "${textItems[4].innerHTML}"`;
      var instructionString = `"instructions": "${textItems[5].innerHTML}"`;
      var jsonString = `{ 
      ${nameString},
      ${typeString},
      ${muscleString},
      ${difficultyString},
      ${instructionString}
      },`
      //saveItem(jsonString);
    }
  });
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