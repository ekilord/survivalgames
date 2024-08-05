let setupGame = (server, level) => {
    server.persistentData.put('game_progress', 'init');
    removeEveryChestHightlight();
    generateChests(level);
    teleportPlayers(level);
    initPlayers(level);
    initCountdown(level);
    server.persistentData.put('game_progress', 'started');

    return 1;
}

let stopGame = (server, level) => {
    const persistentData = server.persistentData;
    let queued_players = persistentData.get('queued_players');
    for (const key of Object.keys(queued_players)) {
        queued_players[key] = 'false';
    }
    persistentData.put('game_progress', 'waiting');
    return 1;
}

let joinLobby = (player, server) => {
    const name = player.getName().getString();
    const persistentData = server.persistentData;
    if (!checkPersistentData(persistentData, 'queued_players', name)) {
        appendPersistentDataDict(persistentData, 'queued_players', name, 'false');
        server.tell(Component.gold(name).append(Component.gray(' has joined the queue!')));
    }
    else {
        player.tell(Component.red('You have already joined the queue!'));
    }
    return 1;
}

let playerVote = (player, server) => {
    const name = player.getName().getString();
    const persistentData = server.persistentData;
    if (checkPersistentData(persistentData, 'queued_players', name)) {
        const status = persistentData.get('queued_players');
        if (status[name] == 'false') {
            appendPersistentDataDict(persistentData, 'queued_players', name, 'true');
            server.tell(Component.darkPurple(name).append(Component.darkGreen(' has voted to start the game!')));
        }
        else {
            player.tell(Component.red('You have already voted!'));
        }
    }
    return 1;
}

let leaveLobby = (player, server) => {
    const name = player.getName().getString();
    const persistentData = server.persistentData;
    if (checkPersistentData(persistentData, 'queued_players', name)) {
        removePersistentDataDict(persistentData, 'queued_players', name, 'false');
        server.tell(Component.red(name).append(Component.yellow(' has left the queue!')));
    }
    else {
        player.tell(Component.red('You have not joined the queue yet!'));
    }
    return 1;
}

let playerUnvote = (player, server) => {
    const name = player.getName().getString();
    const persistentData = server.persistentData;
    if (checkPersistentData(persistentData, 'queued_players', name)) {
        const status = persistentData.get('queued_players');
        if (status[name] == 'true') {
            appendPersistentDataDict(persistentData, 'queued_players', name, 'false');
            server.tell(Component.darkPurple(name).append(Component.darkRed(' has withdrawn their vote!')));
        }
        else {
            player.tell(Component.red('You have already withdrawn your vote!'));
        }
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

let initPlayers = (level) => {

}

let initCountdown = (level) => {

}