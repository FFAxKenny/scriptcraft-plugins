var sb = require('minigames/scoreboard')

var objectiveName = "PVP_Battle";
sb.create(objectiveName, objectiveName);

var redTeamName = "Red_Team";
var blueTeamName = "Blue_Team";
var playerName = "FFAxKenny";

function getCanaryPlayer(){
    return Packages.net.canarymod.api.entity.living.humanoid.Player;
}

events.connection(function(event){
    var name = event.player.name
    var introScore = 0;
    sb.addPlayerToTeam(objectiveName, redTeamName, name)
    // sb.updateScore(objectiveName, name, introScore);
});

events.blockDestroy(function(event){
    // Do nothing for now
});

events.playerDeath(function(event){
    var currentPlayer = event.player;
    var cmPlayer = getCanaryPlayer();
        damageDealer = event.getDamageSource().getDamagetype();

    if(damageDealer === "PLAYER"){
        var killer = event.getDamageSource().getDamageDealer().getDisplayName();
        var current_score = parseInt(sb.getPlayerScore(objectiveName, playerName));
        var new_score = current_score + 1;
        sb.updateScore(objectiveName, playerName, new_score);
        echo(currentPlayer, "Death caused by other player.");
    }
    else{
        echo(currentPlayer, "Damage caused by something else.");
    }
});
