
var dragonBall = {

    //game variables
    currentCharacter: undefined,
    characterSelected: false,
    enemies : [],
    enemySelected : undefined,

    //series of objects representing selectable characters/future combatants
    goku : {
        health : 150,
        baseAttackPower : 8,
        currentAttackPower : 8,
        counterAttackPower : 10,
        icon : "#div-goku",
        isEnemy : false

    },

    vegeta : {
        health : 120,
        baseAttackPower : 12,
        currentAttackPower : 12,
        counterAttackPower : 15,
        icon : "#div-vegeta",
        isEnemy : false
    },

    hit : {
        health : 130,
        baseAttackPower : 10,
        currentAttackPower : 10,
        counterAttackPower : 12,
        icon : "#div-hit",
        isEnemy : false
    },

    beerus : {
        health : 180,
        baseAttackPower : 15,
        currentAttackPower : 15,
        counterAttackPower : 20,
        icon : "#div-beerus",
        isEnemy : false
    },

    //method to reset game state to default upon completion of current game
    resetGame : function() {
        dragonBall.characterSelected = false;
        $(".character-selectable").each(function() {
            $("#character-select-row").append(this);
        });
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
                    dragonBall.currentCharacter = dragonBall.goku;
                    dragonBall.enemies = [dragonBall.goku, dragonBall.hit, dragonBall.beerus];
                    dragonBall.enemies.forEach(function(element) {
                        $("#enemy-row").append($(element.icon));
                        element.isEnemy = true;
                    });
                    break;

                case "div-hit": 
                    dragonBall.currentCharacter = dragonBall.goku;
                    dragonBall.enemies = [dragonBall.goku, dragonBall.vegeta, dragonBall.beerus];
                    dragonBall.enemies.forEach(function(element) {
                        $("#enemy-row").append($(element.icon));
                        element.isEnemy = true;
                    });
                    break;

                case "div-beerus": 
                    dragonBall.currentCharacter = dragonBall.goku;
                    dragonBall.enemies = [dragonBall.goku, dragonBall.vegeta, dragonBall.hit];
                    dragonBall.enemies.forEach(function(element) {
                        $("#enemy-row").append($(element.icon));
                        element.isEnemy = true;
                    });
                    break;
            }

        //checks to see if character has been selected and enemy has not, if it has, chooses clicked character div to be the current enemy to be faced until defeated 
        //excludes currently selected character
        } else if (dragonBall.characterSelected && dragonBall.enemySelected == undefined && ("#" + characterID) != dragonBall.characterSelected.icon) {
            
            //switch checks which enemy has been selected based on div id clicked
            switch (characterID) {
                case "div-goku":
                    dragonBall.enemySelected = dragonBall.goku;
                    $("#defender-section").append($(dragonBall.enemySelected.icon));
                    break;
                case "div-vegeta":
                    dragonBall.enemySelected = dragonBall.vegeta;
                    $("#defender-section").append($(dragonBall.enemySelected.icon));
                    break;
                case "div-hit":
                    dragonBall.enemySelected = dragonBall.hit;
                    $("#defender-section").append($(dragonBall.enemySelected.icon));
                    break;
                case "div-beerus":
                    dragonBall.enemySelected = dragonBall.beerus;
                    $("#defender-section").append($(dragonBall.enemySelected.icon));
                    break;
            }
        }
    }



};

$(document).ready(function() {
    $(".character-selectable").click(function(e) {

        if ($(this).attr('class') !== "character-element") {
            dragonBall.characterClick($(this).attr('id'));
        } else {
            dragonBall.characterClick($(this).parent().attr('id'));
        }
        });
});