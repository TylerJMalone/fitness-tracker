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
        'X-Api-Key': `'${API_KEY}'`
      },
      data: {
        muscle: muscle,
        name: name,
        type: type,
        difficulty: difficulty,
        instructions: instructions,
      },
      success: function(results) {
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
  /*resultContainer.on('click', async function getItem(e) {
    if(e.target.className === 'fav-link') {
      var textItems = e.target.parentNode.children;
      console.log(textItems[1].innerHTML);
      var name = `"${textItems[1].innerHTML}"`;
      var type = `"${textItems[2].innerHTML}"`;
      var muscle = `"${textItems[3].innerHTML}"`;
      var difficulty = `"${textItems[4].innerHTML}"`;
      var instructions = `"${textItems[5].innerHTML}"`;
      var post = $.post('/api/users/favorites', { name: name, type: type, muscle: muscle, difficulty: difficulty, instructions: instructions })
      post.done( function(data) {
        console.log(data);
      });
    }
  });*/
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