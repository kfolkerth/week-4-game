
var dragonBall = {

    //game variables
    currentCharacter: undefined,
    characterSelected: false,
    enemies : [],
    enemySelected : undefined,
    enemiesDefeated : 0,
    
    //series of objects representing selectable characters/future combatants
    goku : {
        name : "Goku",
        health : 150,
        baseAttackPower : 8,
        currentAttackPower : 8,
        counterAttackPower : 10,
        icon : "#div-goku",
        isEnemy : false

    },

    vegeta : {
        name : "Vegeta",
        health : 120,
        baseAttackPower : 12,
        currentAttackPower : 12,
        counterAttackPower : 15,
        icon : "#div-vegeta",
        isEnemy : false
    },

    hit : {
        name : "Hit",
        health : 130,
        baseAttackPower : 10,
        currentAttackPower : 10,
        counterAttackPower : 12,
        icon : "#div-hit",
        isEnemy : false
    },

    beerus : {
        name: "Beerus",
        health : 180,
        baseAttackPower : 15,
        currentAttackPower : 15,
        counterAttackPower : 20,
        icon : "#div-beerus",
        isEnemy : false
    },

    //method to reset game state to default upon completion of current game
    resetGame : function() {

        var allCharacterIcons = [dragonBall.goku.icon, dragonBall.vegeta.icon, dragonBall.hit.icon, dragonBall.beerus.icon];
        
        dragonBall.characterSelected = false;
        dragonBall.currentCharacter = undefined;
        dragonBall.enemySelected = undefined;
        dragonBall.enemies = [];
        dragonBall.enemiesDefeated = 0;
        
        dragonBall.goku.health = 150;
        dragonBall.goku.currentAttackPower = dragonBall.goku.baseAttackPower
        $(dragonBall.goku.icon).find(".health").text(dragonBall.goku.health + " HP");

        dragonBall.vegeta.health = 120;
        dragonBall.vegeta.currentAttackPower = dragonBall.vegeta.baseAttackPower
        $(dragonBall.vegeta.icon).find(".health").text(dragonBall.vegeta.health + " HP");

        dragonBall.hit.health = 130;
        dragonBall.hit.currentAttackPower = dragonBall.hit.baseAttackPower
        $(dragonBall.hit.icon).find(".health").text(dragonBall.hit.health + " HP");

        dragonBall.beerus.health = 180;
        dragonBall.beerus.currentAttackPower = dragonBall.beerus.baseAttackPower;
        $(dragonBall.beerus.icon).find(".health").text(dragonBall.beerus.health + " HP");
        
        allCharacterIcons.forEach(function(e) {
            $(e).show();
            $("#character-select-row").append($(e));
        });

        $("#fight-log").text(" ");
        $("#enemy-log").text(" ");
    },

    //method called whenever a div representing a character or its child elements are clicked on
    characterClick : function(characterID) {

        //checks if a character has been selected, if not, grabs the character by the ID of the character div clicked
        if (!dragonBall.characterSelected) {
            $("#character-area").append($("#" + characterID));
            dragonBall.characterSelected = true;

            //switch statement decides which character has been selected, populates enemy array with remaining characters
            switch (characterID) {
                case "div-goku":
                    dragonBall.currentCharacter = dragonBall.goku;
                    dragonBall.enemies = [dragonBall.vegeta, dragonBall.hit, dragonBall.beerus];
                    dragonBall.enemies.forEach(function(element) {
                        $("#enemy-row").append($(element.icon));
                        element.isEnemy = true;
                    });
                    break;

                case "div-vegeta":
                    dragonBall.currentCharacter = dragonBall.vegeta;
                    dragonBall.enemies = [dragonBall.goku, dragonBall.hit, dragonBall.beerus];
                    dragonBall.enemies.forEach(function(element) {
                        $("#enemy-row").append($(element.icon));
                        element.isEnemy = true;
                    });
                    break;

                case "div-hit": 
                    dragonBall.currentCharacter = dragonBall.hit;
                    dragonBall.enemies = [dragonBall.goku, dragonBall.vegeta, dragonBall.beerus];
                    dragonBall.enemies.forEach(function(element) {
                        $("#enemy-row").append($(element.icon));
                        element.isEnemy = true;
                    });
                    break;

                case "div-beerus": 
                    dragonBall.currentCharacter = dragonBall.beerus;
                    dragonBall.enemies = [dragonBall.goku, dragonBall.vegeta, dragonBall.hit];
                    dragonBall.enemies.forEach(function(element) {
                        $("#enemy-row").append($(element.icon));
                        element.isEnemy = true;
                    });
                    break;
            }

        //checks to see if character has been selected and enemy has not, if it has, chooses clicked character div to be the current enemy to be faced until defeated 
        //excludes currently selected character
        } else if (dragonBall.characterSelected && dragonBall.enemySelected == undefined && ("#" + characterID) !== dragonBall.currentCharacter.icon) {

            //switch checks which enemy has been selected based on div id clicked
            switch (characterID) {
                case "div-goku":
                    console.log("enemy is goku");
                    dragonBall.enemySelected = dragonBall.goku;
                    $("#defender-section").append($(dragonBall.enemySelected.icon));
                    break;
                case "div-vegeta":
                    console.log("enemy is vegeta");
                    dragonBall.enemySelected = dragonBall.vegeta;
                    $("#defender-section").append($(dragonBall.enemySelected.icon));
                    break;
                case "div-hit":
                    console.log("enemy is hit");
                    dragonBall.enemySelected = dragonBall.hit;
                    $("#defender-section").append($(dragonBall.enemySelected.icon));
                    break;
                case "div-beerus":
                    console.log("enemy is beerus");
                    dragonBall.enemySelected = dragonBall.beerus;
                    $("#defender-section").append($(dragonBall.enemySelected.icon));
                    break;
            }
        }
    },

    //if enemy has been selected, decrements health from selected character and enemy, then increments attack power and then calls checkResult to see if fight is over
    attack: function() {

        if (dragonBall.enemySelected != undefined) {

            dragonBall.enemySelected.health -= dragonBall.currentCharacter.currentAttackPower;
            $("#fight-log").text(dragonBall.currentCharacter.name + " attacks " + dragonBall.enemySelected.name + " for " + dragonBall.currentCharacter.currentAttackPower + " damage!");
            dragonBall.currentCharacter.currentAttackPower += dragonBall.currentCharacter.baseAttackPower
            $(dragonBall.enemySelected.icon).find('.health').text(dragonBall.enemySelected.health + " HP");

            dragonBall.currentCharacter.health -= dragonBall.enemySelected.counterAttackPower;
            $("#enemy-log").text(dragonBall.enemySelected.name + " retaliates for " + dragonBall.enemySelected.counterAttackPower + " damage!")
            $(dragonBall.currentCharacter.icon).find('.health').text(dragonBall.currentCharacter.health + " HP");

            dragonBall.checkResult();

        } else {
            $("#fight-log").text("No enemy selected!");
        }
    },

    //checks to see if player character or enemy character health has reached or gone below zero
    checkResult: function() {

        if (dragonBall.enemySelected.health <= 0) {
            $(dragonBall.enemySelected.icon).hide();
            alert(dragonBall.enemySelected.name + " has been defeated!");
            dragonBall.enemySelected = undefined;
            dragonBall.enemiesDefeated++;
            dragonBall.checkVictory();
        } else if (dragonBall.currentCharacter.health <= 0) {
            alert("You have lost!");
            dragonBall.resetGame();
        }
    },

    //if player has defeated all enemies, game is over and reset method called
    checkVictory: function() {

        if (dragonBall.enemiesDefeated == dragonBall.enemies.length) {
            alert("You have defeated all enemies! Victory is yours.");
            dragonBall.resetGame();
        }
    }
};

$(document).ready(function() {

    dragonBall.resetGame();

    $(".character-selectable").click(function(e) {

        if ($(this).attr('class') !== "character-element") {
            dragonBall.characterClick($(this).attr('id'));
        } else {
            dragonBall.characterClick($(this).parent().attr('id'));
        }
        });

    $("#attack-button").click(function(e) {
        dragonBall.attack();
    });
});