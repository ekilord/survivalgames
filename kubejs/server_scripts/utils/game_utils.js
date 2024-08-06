let setupGame = (server, level) => {

    return 1;
}

let stopGame = (server, level) => {
    const persistentData = server.persistentData;
    let queuedPlayers = persistentData.get('queued_players');

    for (const key of Object.keys(queuedPlayers)) {
        queuedPlayers[key] = 'false';
    }
    persistentData.remove('joined_players');
    persistentData.put('game_progress', 'waiting');

    return 1;
}

let leaveGame = (server, player, intentional) => {
    const persistentData = server.persistentData;
    let text = '';

    if (persistentData.get('game_progress') == 'started') {
        const name = player.getName().getString()
        if (intentional) {
            text = 'left the match';
        }
        else {
            text = 'been killed';
        }

        if (checkPersistentDataDict(persistentData, 'joined_players', name)) {
            removePersistentDataArray(persistentData, 'joined_players', name);
            const joinedPlayers = persistentData.get('joined_players');
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

let joinQueue = (server, player) => {
    const name = player.getName().getString();
    const persistentData = server.persistentData;

    if (checkAndAddToQueue(persistentData, 'queued_players', name, 'false')) {
        server.tell(Component.gold(name).append(Component.gray(' has joined the queue!')));
    }
    else {
        player.tell(Component.red('You have already joined the queue!'));
    }

    return 1;
}

let leaveQueue = (server, player) => {
    if (server.persistentData.get('game_progress') == 'waiting' || server.persistentData.get('game_progress') == 'starting') {
        const name = player.getName().getString();
        const persistentData = server.persistentData;

        if (checkAndRemoveFromQueue(persistentData, 'queued_players', name)) {
            server.tell(Component.red(name).append(Component.yellow(' has left the queue!')));
        }
        else {
            player.tell(Component.red('You have not joined the queue yet!'));
        }
    }
    else {
        player.tell(Component.red("You can't leave the queue now!\n").append(Component.gray('Use /sg leave')));
    }

    return 1;
}

//TODO NEM BIZTOS DE SZEBB LENNE A KOD MEG NINCS KESZ NEZD AT 
//ALTALANOSITASON GONDOLKOZNI KELLENE
let checkAndAddToQueue = (holder, dictionary, key, value) => {
    let data = holder.get(dictionary) || {};

    if (Object.keys(data).length > 0) {
        if (data[key] !== undefined) {
            return false;
        }
    }
    data[key] = value;
    holder.put(dictionary, data);
    return true;
}

let checkAndRemoveFromQueue = (holder, dictionary, key) => {
    let data = holder.get(dictionary) || {};

    if (Object.keys(data).length > 0) {
        if (data[key] !== undefined) {
            delete data[key];
            holder.put(dataName, data);
            return true;
        }
    }
    return false;
}

let playerVote = (server, player) => {
    const name = player.getName().getString();
    const persistentData = server.persistentData;

    if (checkPersistentDataDict(persistentData, 'queued_players', name)) {
        const queuedPlayers = persistentData.get('queued_players');

        if (queuedPlayers[name] == 'false') {
            appendPersistentDataDict(persistentData, 'queued_players', name, 'true');
            server.tell(Component.darkPurple(name).append(Component.darkGreen(' has voted to start the game!')));
        }
        else {
            player.tell(Component.red('You have already voted!'));
        }
    }
    else {
        player.tell(Component.red('You have not joined the queue yet!'));
    }

    return 1;
}

let playerUnvote = (server, player) => {
    const name = player.getName().getString();
    const persistentData = server.persistentData;

    if (checkPersistentDataDict(persistentData, 'queued_players', name)) {
        const status = persistentData.get('queued_players');
        if (status[name] == 'true') {
            appendPersistentDataDict(persistentData, 'queued_players', name, 'false');
            server.tell(Component.darkPurple(name).append(Component.darkRed(' has withdrawn their vote!')));
        }
        else {
            player.tell(Component.red('You have already withdrawn your vote!'));
        }
    }
    else {
        player.tell(Component.red('You have not joined the queue yet!'));
    }

    return 1;
}

let generateChests = (level) => {
    const chestLocations = level.persistentData.get("chest_locations");

    for (const [key, value] of Object.entries(chestLocations)) {
        let coord = convertToCoordinatesFromKey(key);
        let block = level.getBlock(new BlockPos(coord.x, coord.y, coord.z));
        block.set('minecraft:chest');
        block.setEntityData({ LootTable: `survivalgames:chests/${value.rarity}`, CustomName: `{"bold":true,"color":"${value.color}","text":"${value.rarity}"}` });
    }
}

let teleportPlayers = (level) => {

}

let initPlayers = (persistentData) => {
    const queuedPlayers = persistentData.get('queued_players');
    let joinedPlayers = [];

    for (const key of Object.keys(queuedPlayers)) {
        joinedPlayers.push(key);
    }
    appendPersistentDataArray(persistentData, 'joined_players', joinedPlayers);
}

let initCountdown = (level) => {

}