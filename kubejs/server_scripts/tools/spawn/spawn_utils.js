let createPlayerSpawn = (persistentData, player) => {
    const key = convertCoordinatesToKey(player.getPos());
    appendPersistentDataArray(persistentData, PersistentData.PLAYER_SPAWNS, key);
    return 1;
}

let removePlayerSpawn = (persistentData, player) => {
    const key = convertCoordinatesToKey(player.getPos());
    removePersistentDataArray(persistentData, PersistentData.PLAYER_SPAWNS, key);
    return 1;
}