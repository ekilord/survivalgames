//  _____   _                             ______                   _        
// |  __ \ | |                           |  ____|                 | |       
// | |__) || |  __ _  _   _   ___  _ __  | |__ __   __ ___  _ __  | |_  ___ 
// |  ___/ | | / _` || | | | / _ \| '__| |  __|\ \ / // _ \| '_ \ | __|/ __|
// | |     | || (_| || |_| ||  __/| |    | |____\ V /|  __/| | | || |_ \__ \
// |_|     |_| \__,_| \__, | \___||_|    |______|\_/  \___||_| |_| \__||___/
//                     __/ |                                                
//                    |___/                                                 

PlayerEvents.loggedIn(event => {
    const { server, player } = event;

    player.setGameMode('adventure');
    server.runCommandSilent(`title ${player.getName().getString()} times 0.15s 0.7s 0.15s`);
    teleportToSpawn(player);
})

PlayerEvents.loggedOut(event => {
    const { player } = event;
    const name = player.name.getString();

    playerUnqueue(name);
    playerLeaveGame(player);
})

EntityEvents.death(event => {
    const { entity } = event;

    if (entity.type == 'minecraft:player' && entity.level.getName().getString() == Constants.arenaLevel) {
        playerKillInMatch(entity);
    }
})

EntityEvents.hurt(event => {
    const { entity } = event;

    if (entity.type == 'minecraft:player') {
        const level = event.entity.getLevel().getName().getString();

        switch (level) {
            case 'minecraft:overworld':
                event.cancel();
                break;
            case 'survivalgames:arena':
                if (isPvpAllowed) return; 
                else event.cancel();
        }
    }
})

BlockEvents.rightClicked('minecraft:dark_oak_wall_sign', event => {
    const text = event.block.entityData.get('front_text').messages;

    if (text.get(0) == '{"text":"[Survival Games]"}' && text.get(2) == '{"text":"Join Game"}') {
        queue(event.player);

        event.cancel();
    }
})