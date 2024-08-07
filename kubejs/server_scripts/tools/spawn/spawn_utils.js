let createPlayerSpawn = (persistentData, pos) => {
    const key = convertCoordinatesToKey(pos);
    appendPersistentDataSet(persistentData, global.PersistentData.PLAYER_SPAWNS, key);
    return 1;
}

let removePlayerSpawn = (persistentData, pos) => {
    const set = new StringSet();
    set.test;
    return 1;
}