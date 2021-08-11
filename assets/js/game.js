// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}

// function to set players name
var getPlayerName = function () {
  var playerName = ""; 

  while (playerName === null || playerName === "") {
    playerName = prompt("What is your robot's name?");
  }

  console.log(playerName);
  return playerName;
}

// function to manage fight or skip
var fightOrSkip = function () {
  // ask player if they'd like to fight or run
  var promptFight = prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // check player response here
  if (promptFight === null || promptFight === "") {
    alert("Please pick FIGHT or SKIP...");
    return fightOrSkip();
  }

  promptFight = promptFight.toLowerCase();

  // if player picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
      // subtract money from playerInfo.money for skipping
      playerInfo.money = Math.max(0, playerInfo.money - 10);

      return true;
    }
  }

  return false;
}

var enemyInfo = [
  {
    name: "Roborto", 
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android", 
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble", 
    attack: randomNumber(10, 14)
  }
];

var playerInfo = {
  name: getPlayerName(),
  health: 100, 
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      alert("Refilling player");
      this.health += 20;
      this.money -= 7;
    }
    else {
      alert("Dude's broke");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      alert("Upgrading player");
      this.attack += 6;
      this.money -= 7;
      }
    else {
      alert("Dude's broke");
    }
  }
};

// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
  // determine who goes first
  var isPlayerTurn = true;

  if (Math.random() >= 0.5) {
    isPlayerTurn = false;
  }
  // end of determine who goes first

  while (playerInfo.health > 0 && enemy.health > 0) {
    if (fightOrSkip()) {
      break;
    }

    if (isPlayerTurn === true) {
      // attack enemy
      console.log("I attack");

      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');
        playerInfo.money = playerInfo.money + 20;
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }

      // enemy attack
      console.log("They attack");

      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      playerInfo.health = Math.max(0, playerInfo.health - damage);

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      } 
    } // end my turn
    else {
      // enemy attack
      console.log("They attack");

      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      playerInfo.health = Math.max(0, playerInfo.health - damage);

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      } 

      // attack enemy
      console.log("I attack");

      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');
        playerInfo.money = playerInfo.money + 20;
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }
    } // end the turn

    // switch player turn for next round by flipping boolean variable
    isPlayerTurn = !isPlayerTurn;

  } // end while, move to next fight if one
}; // end fight()

// function to start a new game
var startGame = function () {
  // reset players stats
  playerInfo.reset();

  // fight each enemy-robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      alert('Welcome to Robot Gladiators! Round ' + (i + 1));

      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];

      pickedEnemyObj.health = randomNumber(40, 60);
      enemyAttack = 12;
      
      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyObj);

      // if we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if player wants to use the store before next round
        var storeConfirm = confirm("The fight is over, visit the store?");

        if (storeConfirm) {
          shop();
        }
      }
    }
    // if player isn't alive, stop the game
    else {
      window.alert('You have lost your robot in battle! Game Over!');
      break;
    }
  }

  // after the loop ends, player is either out of health or enemies to fight
  endGame();
}

// ask player if they'd like to play again
var endGame = function() {
  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  } 
  else {
    window.alert("You've lost your robot in battle.");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  }
  else {
    alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
}

// add shop function here
var shop = function () {
  // ask player what they'd like to do
  var shopOptionPrompt = prompt("Would you like to REFILL, UPGRADE, or LEAVE?");

  shopOptionPrompt = parseInt(shopOptionPrompt);

  switch(shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;

    case 2:
      playerInfo.upgradeAttack();
      break;

    case 3:
      alert("Leaving the store");
      break;

    default:
      alert("You did not pick a valid option. Try again.");
      shop();
      break;
  }
}

// start the game when the page loads
startGame();