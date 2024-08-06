ServerEvents.loaded(event => {
    const { server } = event;
    const persistentData = server.persistentData;

    persistentData.remove('queued_players');
    persistentData.remove('joined_players');
    persistentData.put('game_progress', 'waiting');
})

ServerEvents.tick(event => {
    const { server } = event;
    const persistentData = server.persistentData;
    const queuedPlayers = persistentData.get('queued_players');
    const gameProgress = persistentData.get('game_progress');

    switch (gameProgress) {
        case 'waiting':
            waitingPhase(persistentData, queuedPlayers)
            break;
        case 'starting':
            startingPhase(server, persistentData, queuedPlayers);
            break;
        case 'init':
            initPhase(server);
            break;
        case 'started':
            break;
    }
})

let waitingPhase = (persistentData, queuedPlayers) => {
    if (checkStartRequirements(queuedPlayers)) return;

    persistentData.put('game_progress', 'starting');
    persistentData.put('countdown', CONSTANTS.countdown_length);
}

let startingPhase = (server, persistentData, queuedPlayers) => {
    if (server.tickCount % 20 != 0) return;

    if (checkStartRequirements(queuedPlayers)) {
            persistentData.put('game_progress', 'waiting');
    }
    else {
        let seconds = persistentData.get('countdown');
        seconds = parseInt(seconds.getAsString());

        server.runCommandSilent(`title @a actionbar {"text":"${seconds.toString()}","bold":true,"color":"white"}}`)

        --seconds;
        persistentData.put('countdown', seconds);

        if (seconds <= 0) {
            persistentData.put('game_progress', 'init');
            return;
        }
    }
}

let initPhase = (server) => {
    const persistentData = server.persistentData;

    persistentData.put('game_progress', 'init');
    initPlayers(persistentData);
    /*removeEveryChestHightlight();
    generateChests(level);
    teleportPlayers(level);
    initCountdown(level);*/
    persistentData.put('game_progress', 'started');

    return 1;
}

let checkStartRequirements = (dict) => {
    if (Object.keys(dict).length < CONSTANTS.min_players || 
        Object.keys(dict).length != countVotes(dict)) return false;
    return true;
}

let countVotes = (dict) => {
    let count = 0;

    for (const value of Object.values(dict)) {
        if (value == 'true') ++count;
    }
    return count;
}
