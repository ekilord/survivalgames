//  __  __         _         _        _____              _                   
// |  \/  |       | |       | |      / ____|            | |                  
// | \  / |  __ _ | |_  ___ | |__   | (___   _   _  ___ | |_  ___  _ __ ___  
// | |\/| | / _` || __|/ __|| '_ \   \___ \ | | | |/ __|| __|/ _ \| '_ ` _ \ 
// | |  | || (_| || |_| (__ | | | |  ____) || |_| |\__ \| |_|  __/| | | | | |
// |_|  |_| \__,_| \__|\___||_| |_| |_____/  \__, ||___/ \__|\___||_| |_| |_|
//                                            __/ |                          
//                                           |___/                           


let setupGame = (server, level) => {

    return 1;
}

let stopGame = (server, level) => {
    const persistentData = server.persistentData;
    let queuedPlayers = persistentData.get(global.PersistentData.QUEUED_PLAYERS);

    for (const key of Object.keys(queuedPlayers)) {
        queuedPlayers[key] = 'false';
    }
    persistentData.remove(global.PersistentData.JOINED_PLAYERS);
    persistentData.put(global.PersistentData.GAME_STATE, global.GameState.WAITING);

    return 1;
}

//TODO NAGYON RONDA KONYORGOM JAVITSD KI
let leaveGame = (server, player, intentional) => {
    const persistentData = server.persistentData;
    let text = '';

    if (persistentData.get(PersistentData.GAME_STATE) == global.GameState.STARTED) {
        const name = player.getName().getString()
        if (intentional) {
            text = 'left the match';
        }
        else {
            text = 'been killed';
        }

        if (checkPersistentData(persistentData, global.PersistentData.JOINED_PLAYERS, name)) {
            removePersistentData(persistentData, global.PersistentData.JOINED_PLAYERS, name);
            const joinedPlayers = persistentData.get(global.PersistentData.JOINED_PLAYERS);
            const playerCount = Object.keys(joinedPlayers).length;

            server.tell(Component.gold(name)
                .append(Component.red(` has ${text}!\n`)
                    .append(Component.yellow(`${playerCount} people remain!`))));
        }
    }
    else {
        if (intentional) {
            player.tell(Component.red('The game has not started yet!'));
        }
    }
}

let generateChests = (level) => {
    const chestLocations = level.persistentData.get(global.PersistentData.CHEST_LOCATIONS);

    for (const [key, value] of Object.entries(chestLocations)) {
        let coord = convertToCoordinatesFromKey(key);
        let block = level.getBlock(new BlockPos(coord.x, coord.y, coord.z));
        block.set('minecraft:chest');
        block.setEntityData({ LootTable: `survivalgames:chests/${value.rarity}`, CustomName: `{"bold":true,"color":"${value.color}","text":"${value.rarity}"}` });
    }
}

let initPlayers = (persistentData) => {
    const queuedPlayers = persistentData.get(global.PersistentData.QUEUED_PLAYERS);

    for (const key of Object.keys(queuedPlayers)) {
        addPersistentData(persistentData, global.PersistentData.JOINED_PLAYERS, key, '');
    }
    
}

let teleportPlayers = (level) => {
    const players = persistentData.get(global.PersistentData.JOINED_PLAYERS);

    for (const player of players) {
        
    }
}

let initCountdown = (level) => {

}
