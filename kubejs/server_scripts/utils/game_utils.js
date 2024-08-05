let startGame = (server, level) => {
    server.persistentData.put('game_in_progress', 'true');
    removeEveryChestHightlight();
    generateChests(level);
    teleportPlayers(level);
    initPlayers(level);
    initCountdown(level);

    return 1;
}

let stopGame = (server, level) => {

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