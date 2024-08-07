//  _____   _                            
// |  __ \ | |                           
// | |__) || |__    __ _  ___   ___  ___ 
// |  ___/ | '_ \  / _` |/ __| / _ \/ __|
// | |     | | | || (_| |\__ \|  __/\__ \
// |_|     |_| |_| \__,_||___/ \___||___/


let waitingPhase = (persistentData, queuedPlayers) => {
    if (!startRequirementsMet(queuedPlayers)) return;

    persistentData.put(PersistentData.GAME_STATE, GameState.STARTING);
    persistentData.put(PersistentData.COUNTDOWN, global.config.countdown_length);
}

let startingPhase = (server, persistentData, queuedPlayers) => {
    if (server.tickCount % 20 != 0) return;

    if (startRequirementsMet(queuedPlayers)) {
        let seconds = persistentData.get(PersistentData.COUNTDOWN);
        seconds = parseInt(seconds.getAsString());

        server.runCommandSilent(`title @a actionbar {"text":"${seconds.toString()}","bold":true,"color":"white"}}`)

        --seconds;
        persistentData.put(PersistentData.COUNTDOWN, seconds);

        if (seconds <= 0) {
            persistentData.put(PersistentData.GAME_STATE, GameState.INIT);
            return;
        }
    }
    else {
        persistentData.put(PersistentData.GAME_STATE, GameState.WAITING);
    }
}

let initPhase = (server) => {
    const persistentData = server.persistentData;

    persistentData.put(PersistentData.GAME_STATE, GameState.INIT);
    initPlayers(persistentData);
    removeEveryChestHightlight();
    generateChests(level);
    /*teleportPlayers(level);
    initCountdown(level);*/
    persistentData.put(PersistentData.GAME_STATE, GameState.STARTED);
}