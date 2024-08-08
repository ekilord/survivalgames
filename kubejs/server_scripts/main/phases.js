//  _____   _                            
// |  __ \ | |                           
// | |__) || |__    __ _  ___   ___  ___ 
// |  ___/ | '_ \  / _` |/ __| / _ \/ __|
// | |     | | | || (_| |\__ \|  __/\__ \
// |_|     |_| |_| \__,_||___/ \___||___/


let waitingPhase = (persistentData, queuedPlayers) => {
    if (!startRequirementsMet(queuedPlayers)) return;

    persistentData.put(global.PersistentData.GAME_STATE, global.GameState.STARTING);
    persistentData.put(global.PersistentData.COUNTDOWN, global.config.countdown_length);
}

let startingPhase = (server, persistentData, queuedPlayers) => {
    if (server.tickCount % 20 != 0) return;

    if (startRequirementsMet(queuedPlayers)) {
        let seconds = persistentData.get(global.PersistentData.COUNTDOWN);
        seconds = parseInt(seconds.getAsString());

        server.runCommandSilent(`title @a actionbar {"text":"${seconds.toString()}","bold":true,"color":"white"}}`)

        --seconds;
        persistentData.put(global.PersistentData.COUNTDOWN, seconds);

        if (seconds <= 0) {
            persistentData.put(global.PersistentData.GAME_STATE, global.GameState.INIT);
            return;
        }
    }
    else {
        persistentData.put(global.PersistentData.GAME_STATE, global.GameState.WAITING);
    }
}

let initPhase = (server) => {
    const persistentData = server.persistentData;

    persistentData.put(global.PersistentData.GAME_STATE, global.GameState.INIT);
    initPlayers(persistentData);
    generateChests(level);
    initSpawnPoints(level);
    teleportPlayers(level);
    persistentData.put(global.PersistentData.GAME_STATE, global.GameState.STARTED);
}