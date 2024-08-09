let initPhase = () => {
    setGameState(GAME_STATE.INIT);

    initPlayers();
    generateChests();
    restrictSpawnPoints();
    teleportPlayers();
    startCountdown();

    setGameState(GAME_STATE.STARTED);
}

let generateChests = () => {
    const chestLocations = getLootChests();
    if (chestLocations === null) return;
    const level = Utils.server.getLevel(Constants.arenaLevel);

    for (const [key, value] of Object.entries(chestLocations)) {
        let coord = convertToCoordinatesFromKey(key);
        let block = level.getBlock(new BlockPos(coord.x, coord.y, coord.z));
        block.set('minecraft:chest');
        block.setEntityData({ LootTable: `survivalgames:chests/${value.rarity}`, CustomName: `{"bold":true,"color":"${value.color}","text":"${value.rarity}"}` });
    }
}

let initPlayers = () => {
    const queuedPlayers = getQueuedPlayers();

    for (const key of Object.keys(queuedPlayers)) {
        addPlayerToMatch(key);
    }

}

let restrictSpawnPoints = () => {

}

let teleportPlayers = () => {
    const totalPlayers = Utils.server.getPlayerList();
    const joinedPlayers = getJoinedPlayers();
    const spawnPoints = invertKeyValuePairs(getPlayerSpawnPoints());

    let i = 0;
    for (const player of Object.keys(joinedPlayers)) {
        const location = convertToCoordinatesFromKey(spawnPoints[i]);
        totalPlayers.getPlayerByName(player).teleportTo(Constants.arenaLevel, location.x + 0.5, location.y, location.z + 0.5, 0, 0);
        ++i;
    }
}

let freeSpawnPoints = () => {

}

let startCountdown = () => {

}


