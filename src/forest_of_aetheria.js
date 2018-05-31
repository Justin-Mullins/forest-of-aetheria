// Initialize the Map
var map = [];
map[0] = "A woman sits on the forest floor. She has an otherworldly look about her.";
map[1] = "You approach the edge of a pool of water.";
map[2] = "You see a small secluded cabin. You hear the faint sound of music coming from within. Upon closer inspection, the door is locked. And there is a sign on the door saying 'Visitors Not Welcome!' You figure it's probably best not to knock.";
map[3] = "A translucent image appears before you.";
map[4] = "Tall trees line your path as you head deeper into the forest.";
map[5] = "You can see a forest brook and hear the sound of steadily churning water.";
map[6] = "You see a narrow gravel path going through the forest.";
// Darkness hangs heavily over this part of the forest. You hear the sound of muffled screams all around you.
map[7] = "A dark narrow tunnle lies in front of you. You hear hushed whispers coming from the other side of the tunnle.";
map[8] = "Sunshine breaks through the line of trees in front of you.";
map[9] = "Lush foliage covers the ground surrounding the path winding it's way though the forest.";
map[10] = "You see a paved road leading through the forest.";
map[11] = "Trees surround you and lush vegitation covers the ground around.";
map[12] = "In a small clearing, you see a well.";
map[13] = "A pond lies before you.";
map[14] = "You are in the middle of the forest. Trees surround you on all sides.";
map[15] = "You are in wooded area, dense with trees.";

// Set player's starting location on the Map;
var mapLoctaion = 15;

// Initialize array with images for the location backgrounds
var images = [];
images[0] = "1forest.png";
images[1] = "2forest.png";
images[2] = "3forest.png";
images[3] = "4forest.png";
images[4] = "5forest.png";
images[5] = "6forest.png";
images[6] = "7forest.png";
images[7] = "8forest.png";
images[8] = "9forest.png";
images[9] = "10forest.png";
images[10] = "11forest.png";
images[11] = "12forest.png";
images[12] = "13forest.png";
images[13] = "14forest.png";
images[14] = "15forest.png";
images[15] = "16forest.png";

// Initialize an array for boundary messages
var blockedPathMessages = [];
blockedPathMessages[0] = "The woman shouts, 'You must not go that way! It isn't safe!'. She gives you a apprehensive look and shakes her head slowly.";
blockedPathMessages[1] = "You are unable to find a way to cross the water.";
blockedPathMessages[2] = "There is a tall cliff overlooking a rocky valley below. You cannot go this way.";
blockedPathMessages[3] = "You cannot go this way.";
blockedPathMessages[4] = "The trees are too thick to pass this way.";
blockedPathMessages[5] = "";
blockedPathMessages[6] = "A tangle of thick thorns block your way.";
blockedPathMessages[7] = "There is a mysterious force blocking your way.";
blockedPathMessages[8] = "The trees are too thick to pass this way.";
blockedPathMessages[9] = "";
blockedPathMessages[10] = "A tangle of thick thorns block your way.";
blockedPathMessages[11] = "";
blockedPathMessages[12] = "Beyond the well, lies a body of water. You are unable to cross.";
blockedPathMessages[13] = "You are unable to find a way to cross the water.";
blockedPathMessages[14] = "There is a large body of water this way that you cannot cross.";
blockedPathMessages[15] = "There is a large body of water this way that you cannot cross.";

// Initialize sounds and music
var stoneSound = new Audio('../sounds/stone_impact.wav');

// Initialize array of items, and item locations
var items = ["stone"];
var itemLocations = [5];

// Initialize player backpack to hold items
var backpack = [];

// Initialize the player's input
var playersInput = "";

// Initialize the gameMessage
var gameMessage = "";

// Create an array of actions the game understands
// and a variable to store the current action
var actionsIKnow = ["north", "west", "south", "east", "talk", "speak", "say", "use", "take", "pick up", "grab", "drop"];
var action = "";

// Create an array of items the game understands
// and a variable to store current item player chooses.
var itemsIKnow = ["flute", "stone", "pendant"];
var item = "";

// Input and output
var output = document.querySelector("#output");
var input = document.querySelector("#input");
var image = document.querySelector("#image");
var mapImage = document.querySelector("#mapImage");

// The button
var button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);

// Display the player's location
render();

function clickHandler() {
  playGame();
}

function playGame() {
  // Get the player's input and convert it to lowercase
  playersInput = input.value;
  playersInput = playersInput.toLowerCase();

  // Reset these variables from the previous turn
  gameMessage = "";
  action = "";

  // Figure out the player's action
  for (i = 0; i < actionsIKnow.length; i++) {
    if (playersInput.indexOf(actionsIKnow[i]) !== -1) {
      action = actionsIKnow[i];
      console.log("player's action: " + action);
      break;
    }
  }

  // Figure out the item the player wants to interact with
  for (i = 0; i < itemsIKnow.length; i++) {
    if (playersInput.indexOf(itemsIKnow[i]) !== -1) {
      item = itemsIKnow[i];
      console.log("player's item: " + item);
      break;
    }
  }

  // Check if player's action is "speak" or "say", then changes action to "talk"
  if (action === "speak" || action === "say") {
    action = "talk";
  }

  if (action === "grab" || action === "pick up") {
    action = "take";
  }

  // Choose correct action
  switch (action) {
    case "north":
      if (mapLoctaion === 0 || mapLoctaion === 1 || mapLoctaion === 2) {
        mapLoctaion += 12;
      } // Block off the passage to at map 11. Until the blockedPathMessages is cleared.
      else if (mapLoctaion === 3 || (mapLoctaion === 7 && blockedPathMessages[mapLoctaion] !== "")) {
        gameMessage = blockedPathMessages[mapLoctaion];
      }
      else {
        mapLoctaion -= 4;
      }
      break;
    case "east":
      if (mapLoctaion === 2) {
        mapLoctaion -= 2;
      }
      else if (mapLoctaion === 7 || mapLoctaion === 11 || mapLoctaion === 15) {
        mapLoctaion -= 3;
      }
      else if (mapLoctaion === 3 && blockedPathMessages[mapLoctaion] !== "") {
        gameMessage = blockedPathMessages[mapLoctaion];
      }
      else {
        mapLoctaion += 1;
      }
      break;
    case "south":
      if (mapLoctaion === 12 || mapLoctaion === 13 || mapLoctaion === 14) {
        mapLoctaion -= 12;
      }
      else if (mapLoctaion === 15) {
        mapLoctaion -= 4;
      }
      else {
        mapLoctaion += 4;
      }
      break;
    case "west":
      if (mapLoctaion === 0) {
        mapLoctaion += 2;
      }
      else if (mapLoctaion === 8 || mapLoctaion === 12 || mapLoctaion === 4) {
        mapLoctaion += 3;
      }
      else {
        mapLoctaion -= 1;
      }
      break;
    case "talk":
      talkWith();
      break;
    case "take":
      takeItem();
      break;
    case "use":
      useItem();
      break;
    case "drop":
      dropItem();
      break;
    default:
      gameMessage = "I don't understand that.";
  }

  // Render the game
  render();
}

function render() {
  // Render the location
  output.innerHTML = map[mapLoctaion];
  image.src = "../images/" + images[mapLoctaion];

  // Render the map
  mapImage.src = "../images/map1/map" + mapLoctaion + ".png";

  // Display game message
  output.innerHTML += "<br><em>" + gameMessage + "</em>";

  // Display an item if there is one in this locations
  // Loop through all game elements
  for (var i = 0; i < items.length; i++) {
    // Find out if there's an item at this locations
    if (itemLocations[i] === mapLoctaion) {
      // Display it
      output.innerHTML += "<br>You see a <strong>" + items[i] + "</strong> here.";
    }
  }

  // Display the player's backpack contents
  if (backpack.length !== 0) {
    output.innerHTML += "<br>You are carrying: " + backpack.join(", ");
  }
}

function takeItem() {
  // find the index number of the item in the items array
  var itemIndexNumber = items.indexOf(item);

  // Does the item exist in the game world and is it at the player's current location?
  if (itemIndexNumber !== -1 && itemLocations[itemIndexNumber] === mapLoctaion) {
    gameMessage = "You take the " + item + ".";

    // Add the item to the player's backpack
    backpack.push(item);

    // Remove the item from the game world
    items.splice(itemIndexNumber, 1);
    itemLocations.splice(itemIndexNumber, 1);
  }
  else {
    gameMessage = "You can't do that.";
  }
}

function dropItem() {
  if (backpack.length !== 0) {
    // find the index number of the item in the items array
    var backpackIndexNumber = backpack.indexOf(item);

    // Does the item exist in the player's backpack?
    if (backpackIndexNumber !== -1) {

      gameMessage = "You drop the " + item + ".";

      // Add the item to the game world
      items.push(backpack[backpackIndexNumber]);
      itemLocations.push(mapLoctaion);

      // Remove the item to the player's backpack
      backpack.splice(backpackIndexNumber, 1);
    }
    else {
      gameMessage = "You can't do that.";
    }
  }
  else {
    gameMessage = "You're not carrying anything.";
  }
}

function useItem() {
  // Create a variable to store item index in the backpack.
  var backpackIndexNumber = backpack.indexOf(item);
  // Check that item is in player's backpack
  if (backpackIndexNumber === -1) {
    gameMessage = "You aren't carrying that item.";
  }

  // Check if backpack is empty
  if (backpack.length === 0) {
    gameMessage += "<br>Your backpack is empty.";
  }

  // If the item is found in the backpack, figure out what to do.
  if (backpackIndexNumber !== -1) {
    switch (backpack[backpackIndexNumber]) {
      case "stone":
        if (mapLoctaion === 12) {
          stoneSound.play();
          gameMessage = "<br>You drop the stone into the well. You hear a distant 'Clack!', as you hear it hit the bottom. Moments later, from deep within the well, you see a glowing object floating up from below. As it gets nearer you can make out that it's a flute.";
          // Remove stone from backpack.
          backpack.splice(backpackIndexNumber, 1);
          // Push flute into the world.
          items.push("flute");
          itemLocations.push(mapLoctaion);
        }
        else {
          gameMessage = "You fumble with the stone in your pocket.";
        }
        break;
      case "flute":
        if (mapLoctaion === 2) {
          gameMessage = "<br>You don't know how to play a flute, so the sounds you make are unpleasant. A few moments later, the music inside the cabin fade away. The door burst open and a grizzled old man stomps over to you looking very annoyed."
          gameMessage += "' That was the most awful noise I've ever heard. I'll trade you this pendant for your flute just so I don't have to listen to that garbage anymore.'";
          gameMessage += " He yanks the flute from your hands and throws something on the ground. Then he stomps back toward his cabin and goes back inside.";
          // Remove flute from backpack.
          backpack.splice(backpackIndexNumber, 1);
          // Push pendant into the world.
          items.push("pendant");
          itemLocations.push(mapLoctaion);
        }
        else {
          gameMessage = "You don't know how to play a flute, so the sounds you make are not pleasant.";
        }
        break;
      case "pendant":
        if (mapLoctaion === 7) {
          gameMessage = "<br>You hold the pendant out, waiting for something to happen. Moments later, the pendant starts to float out of your grasp. You feel the";
          gameMessage += " ground start to shake a little. And swirls of white light spin in an intricate pattern in front of the tunnle entrance."
          gameMessage += " You hear a loud 'Thonk!' and then everything goes back to normal. You reach out and can feel the force holding the entrance closed is now gone.";
          // Remove pendant from the backpack.
          backpack.splice(backpackIndexNumber, 1);
          // Remove the blocked path message.
          // Which will also allow movement to next area. (Reference the case statement for "north")
          blockedPathMessages[mapLoctaion] = "";
        }
        else {
          gameMessage = "You hold the pendant out, waiting for something to happen. But nothing does.";
        }
        break;
      default:

    }
  }
}

function talkWith() {
  // Talking to the lady in the forest
  if (mapLoctaion === 0) {
    if (backpack.length === 0) {
      gameMessage = "'Be careful, this forest has some dark magic at work here.'";
    }
    else if (backpack.indexOf("stone") !== -1) {
      gameMessage = "'I wonder how deep that well is? Maybe if you had something to test it's depth...'";
    }
    else if (backpack.indexOf("flute") !== -1) {
      gameMessage = "'Did you hear the music coming from that cabin? I'll bet that is a good place to play some music.'";
    }
    else if (backpack.indexOf("pendant") !== -1) {
      gameMessage = "'There is a place in this forest where a mysterious force blocks the path.'";
    }
  } // Talking to forest guardian
  else if (mapLoctaion === 3) {
    gameMessage = "'Do not fear. I am the guardian of this forest. You have broken the spell that was keeping me bound.";
    gameMessage += " Thank you for your help. I can now undo the magic here, and you will finally be able to leave the forest.";
    gameMessage += " You have proven yourself to be a worthy guardian of this forest. When my time draws close to an end";
    gameMessage += " you may be called upon to be the new guardian. Godspeed, my friend.'";
    // Change the button event listener so it will run the endGame function.
    button.addEventListener("click", endGame, false);
    button.innerHTML = "End Game";
  }
  else {
    gameMessage = "There is no one to talk to.";
  }
}

function endGame() {
  gameMessage = "<br>You have vanquished darkness, and have won the game!";
  // Change to the title screen.
  image.src = "../images/" + "title_screen.png";

  // Add some credits here
}
