//  _____         _  _     _____   _                       
// |_   _|       (_)| |   |  __ \ | |                      
//   | |   _ __   _ | |_  | |__) || |__    __ _  ___   ___ 
//   | |  | '_ \ | || __| |  ___/ | '_ \  / _` |/ __| / _ \
//  _| |_ | | | || || |_  | |     | | | || (_| |\__ \|  __/
// |_____||_| |_||_| \__| |_|     |_| |_| \__,_||___/ \___|

let initPhase = () => {
    setGameState(GameState.INIT);

    initPlayers();
    generateChests();
    setSpawnPointCage('minecraft:barrier');
    teleportPlayers();

    setMatchTime(0);
    setGameState(GameState.STARTED);
}

let generateChests = () => {
    const chestLocations = getLootChests();
    if (chestLocations === null) return;
    const level = Utils.server.getLevel(Constants.arenaLevel);

    for (const [key, value] of Object.entries(chestLocations)) {
        let position = convertToCoordinatesFromKey(key);
        const random = Math.random();

        switch (value) {
            case Rarity.COMMON:
                if (random < 0.7) setChest(level, position, value, 'lolmcvbop:dead_chest');
                break;
            case Rarity.UNCOMMON:
                if (random < 0.7) setChest(level, position, value, 'lolmcvbop:pine_chest');
                break;
            case Rarity.RARE:
                if (random < 0.7) setChest(level, position, value, 'lolmcvbop:magic_chest');
                break;
            case Rarity.EPIC:
                if (random < 0.65) setChest(level, position, value, 'lolmcvbop:crimson_chest');
                break;
            case Rarity.LEGENDARY:
                if (random < 0.65) setChest(level, position, value, 'lolmcvbop:palm_chest');
                break;
        }
    }
}

let setChest = (level, position, rarity, chestType) => {
    let block = level.getBlock(new BlockPos(position.x, position.y, position.z));
    block.set(chestType);
    block.setEntityData({ LootTable: `survivalgames:chests/${rarity.rarity}`, CustomName: `{"bold":true,"color":"${rarity.color}","text":"${rarity.rarity} Loot Chest"}` });
}

let initPlayers = () => {
    const queuedPlayers = getQueuedPlayers();

    for (const key of Object.keys(queuedPlayers)) {
        addPlayerToMatch(key);
    }

}

let teleportPlayers = () => {
    const totalPlayers = Utils.server.getPlayerList();
    const joinedPlayers = getJoinedPlayers();
    const spawnPoints = invertKeyValuePairs(getPlayerSpawnPoints());

    let i = 0;
    for (const player of Object.keys(joinedPlayers)) {
        let location = convertToCoordinatesFromKey(spawnPoints[i]);
        totalPlayers.getPlayerByName(player).teleportTo(Constants.arenaLevel, location.x + 0.5, location.y + 0.5, location.z + 0.5, 0, 0);
        ++i;
    }
}



