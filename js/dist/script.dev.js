"use strict";

var maker = document.getElementById("TeamMaker"); // constraint PEOPLE_LIMIT for number of people involved

var PEOPLE_LIMIT = 16; // -------- MAIN MAIN MAIN ------- //

maker.addEventListener('submit', function (event) {
  // click submit and do the operation of distributing into teams
  event.preventDefault();
  var numPeople = document.getElementById('numPeople').value; // retrieves number of people

  var numTeams = document.getElementById('numTeams').value; // retrieves number of teams

  console.log("Number of people: " + numPeople);

  try {
    if (numPeople > PEOPLE_LIMIT) {
      alert("Too many People");
    } else {
      var TeamMembers = document.querySelector('.TeamMembers'); // retrieve div containing input boxes

      var members = TeamMembers.getElementsByTagName('*'); // retrieve children of above div

      var participants = [];

      for (var x = 0; x < numPeople; x++) {
        participants.push(members[x].value);
      }

      console.log(participants);
      shuffled_participants = shuffle_members(participants);
      var teams = distribute_members(numTeams, shuffled_participants);
      console.log(teams);
      show_team(teams);
    }
  } catch (error) {
    if (error == undefined) {
      alert('Generated boxes is less than number of people. Please input number of people and press "Generate"');
    }
  }
}); // ------ [END MAIN] -----//
// Generates additional input boxes based on number of people participating

document.getElementById('countSubmit').onclick = function createNameSpace(event) {
  event.preventDefault();
  var numPeople = document.getElementById('numPeople').value; // # people

  var TeamMembers = document.querySelector('.TeamMembers'); // selects the input boxes' parent div

  var TeamMembers_children = TeamMembers.getElementsByTagName('*').length; // # of <input> boxes in div

  if (numPeople > PEOPLE_LIMIT) {
    alert("Too Many People. Please Choose a Maximum of 16");
  } else {
    TeamMembers.innerHTML = ' ';

    for (numPeople; numPeople > 0; numPeople--) {
      document.querySelector('.TeamMembers').innerHTML += "<input type=\"text\" id=\"members\" name=\"members\" required>";
    }
  }
};

function tester() {
  // USED FOR TESTING PURPOSES
  // retrieves number of peoplelet 
  var numPeople = 6;
  console.log("Number of people: " + numPeople);
  var PEOPLE_LIMIT = 10; // constraint PEOPLE_LIMIT for number of people involved

  if (numPeople == 5) {
    alert("Too many People");
  } else if (numPeople == 6) {
    var _participants = ["james", "allen", "connor", "lucy", "leo", ""];
    console.log("everyone: " + _participants);
  }

  var participants = ["james", "allen", "connor", "lucy", "leo", ""];
  var teams = distribute_members(3, participants);
  console.log(teams);
  show_team(teams);
}

function distribute_members(num_teams, participants) {
  // num_teams = # of teams
  // participants = [array holding participants]
  // teams = dictionary holding the teams and their members
  var teams = {};
  console.log("Array before shuffle: " + participants);
  console.log(teams); //shuffle_array(participants)

  console.log("Array after shuffle: " + participants); // loop that creates the team names

  for (var x = 1; x <= num_teams; x++) {
    var name = "Team " + x;
    teams[name] = null;
  }

  var groups = Object.keys(teams).length;

  while (participants.length > 0) {
    for (var teamNumber = 1; teamNumber <= groups; teamNumber++) {
      if (participants[0].length > 0) {
        if (teams["Team ".concat(teamNumber)] == null || teams["Team ".concat(teamNumber)] == "") {
          teams["Team ".concat(teamNumber)] = participants.pop(0);
        } else {
          teams["Team ".concat(teamNumber)] += ',' + participants.pop(0);
        }

        if (participants.length == 0) {
          break;
        }
      } else {
        participants.pop(0);
      }
    }
  }

  for (var key in teams) {
    var value = teams[key];
    console.log("".concat(key, ": ").concat(value));
  }

  return teams;
}

function show_team(teams) {
  var TeamResult = document.querySelector('.TeamResult');
  TeamResult.classList.add('show');
  TeamResult.innerHTML = ' ';

  for (var key in teams) {
    var values = teams[key].split(',');
    var addTeam = document.createElement("div");
    addTeam.className = "teamGrid";
    TeamResult.appendChild(addTeam);
    team_color = random_color();
    console.log(team_color);
    addTeam.innerHTML += "<h1 style=\"background-color:#".concat(team_color, ";\">").concat(key, "</h1>");

    for (var x = 0; x < values.length; x++) {
      addTeam.innerHTML += "<h3>".concat(values[x], "</h3>");
    }
  }
  /* for(let numberOfTeams in teams) {
      TeamResult.innerHTML += 
          `<div class="teamGrid"><h1>Hey</h1>`;
      for(let key in teams) {
          const value = teams[key];
          TeamResult.innerHTML +=
              '<h3>'+`${value}`+'</h3>';
      }
      TeamResult.innerHTML = '</div>'; */

}

function remove_member(teams) {}

function random_color() {
  // RETURNS A RANDOM COLOR HEX
  var characters = "0123456789ABCDEF";
  var random_hex = ''; // TO avoid getting white as team color:

  /* while (random_hex != '000') {
      [NEST THE HEX GENERATOR HERE]
  } 
  */
  // HEX GENERATOR

  for (var x = 0; x < 3; x++) {
    var color_ch = Math.floor(Math.random() * characters.length);
    random_hex += characters.charAt(color_ch);
  }

  return random_hex;
}

function shuffle_members(array) {
  // shuffle array members
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [array[j], array[i]];
    array[i] = _ref[0];
    array[j] = _ref[1];
  }

  return array;
}