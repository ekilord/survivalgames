let getGameState = () => {
    return getPersistentData(PersistentData.GAME_STATE);
}

let setGameState = (gameState) => {
    setPersistentData(PersistentData.GAME_STATE, gameState);
}

let getCountdown = () => {
    return getPersistentData(PersistentData.COUNTDOWN);
}

let setCountdown = (seconds) => {
    setPersistentData(PersistentData.COUNTDOWN, seconds);
}

let getQueuedPlayers = () => {
    return getPersistentData(PersistentData.QUEUED_PLAYERS) || {};
}

let addPlayerToQueue = (name) => {
    return addPersistentData(PersistentData.QUEUED_PLAYERS, name, 'false');
}

let removePlayerFromQueue = (name) => {
    return removePersistentData(PersistentData.QUEUED_PLAYERS, name);
}

let playerQueued = (name) => {
    if (persistentDataContains(name)) return 'error';
    addPlayerToQueue(name);
    return 'success';
}

let playerUnqueued = (name) => {
    if (!persistentDataContains(name)) return 'error';
    removePlayerFromQueue(name);
    return 'success';
}

let playerVoted = (name) => {
    let queuedPlayers = getQueuedPlayers || {};

    if (persistentDataContains(PersistentData.QUEUED_PLAYERS, name)) {
        if (queuedPlayers[name] !== 'true') {
            queuedPlayers[name] = 'true';
            setPersistentData(PersistentData.QUEUED_PLAYERS, queuedPlayers);

            return 'success';
        }
        else return 'has_voted';
    }
    else return 'unqueued';
}

let playerUnvoted = (name) => {
    let queuedPlayers = getQueuedPlayers || {};

    if (persistentDataContains(PersistentData.QUEUED_PLAYERS, name)) {
        if (queuedPlayers[name] !== 'false') {
            queuedPlayers[name] = 'false';
            setPersistentData(PersistentData.QUEUED_PLAYERS, queuedPlayers);

            return 'success';
        }
        else return 'not_voted';
    }
    else return 'unqueued';
}

let getJoinedPlayers = () => {
    return getPersistentData(PersistentData.JOINED_PLAYERS) || {};
}

let addPlayerToMatch = (name) => {
    return addPersistentData(PersistentData.JOINED_PLAYERS, name, '');
}

let removePlayerFromMatch = (name) => {
    return removePersistentData(PersistentData.JOINED_PLAYERS, name);
}

let clearJoinedPlayers = () => {
    clearPersistentData(PersistentData.JOINED_PLAYERS);
}

let getLootChests = () => {
    return getPersistentData(PersistentData.CHEST_LOCATIONS) || {};
}

let addLootChest = (location, rarity) => {
    return addPersistentData(PersistentData.CHEST_LOCATIONS, location, rarity);
}

let removeLootChest = (location) => {
    return removePersistentData(PersistentData.CHEST_LOCATIONS, location);
}

let getPlayerSpawnPoints = () => {
    return getPersistentData(PersistentData.PLAYER_SPAWNS) || {};
}

let addPlayerSpawnPoint = (location, order) => {
    return addPersistentData(PersistentData.PLAYER_SPAWNS, location, order);
}

let removePlayerSpawnPoint = (location) => {
    return removePersistentData(PersistentData.PLAYER_SPAWNS, location);
}

let persistentDataContains = (id, key) => {
    let data = global.persistentData.get(id) || {};
    
    if (Object.keys(data).length > 0) {
        if (data[key] !== undefined) {
            return true;
        }
    }

    return false;
}

let getPersistentData = (key) => {
    return global.persistentData.get(key);
}

let setPersistentData = (key, value) => {
    global.persistentData.put(key, value);
}

let clearPersistentData = (key) => {
    global.persistentData.remove(key);
}

let addPersistentData = (id, key, value) => {
    let data = global.persistentData.get(id) || {};

    //TODO PROBLEMA VALAHOL ITT
    Utils.server.tell(`${key}   ${data[key]}`)
    if (key in data) return false;
    data[key] = value;
    global.persistentData.put(id, data);

    return true;
}

let removePersistentData = (id, key) => {
    let data = global.persistentData.get(id) || {};

    if (Object.keys(data).length > 0) {
        if (data[key] !== undefined) {
            delete data[key];
            global.persistentData.put(id, data);
            
            return true;
        }
    }

    return false;
}