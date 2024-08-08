let createPlayerSpawn = (persistentData, player) => {
    const position = player.block.pos;
    const key = convertFromCoordinatesToKey(position);
    const spawns = persistentData.get(global.PersistentData.PLAYER_SPAWNS);
    const value = (spawns == null ? 0 : Object.keys(spawns).length);

    addPersistentData(persistentData, global.PersistentData.PLAYER_SPAWNS, key, value);
    player.tell(
        Component.green('\n\n=====================================================\n\n').append(
            Component.yellow(`Succesfully create spawn point ${value}!\n`).append(
                Component.gray(`Coordinates: x: ${position.x}, y: ${position.y}, z: ${position.z}`).append(
                    Component.green('\n\n=====================================================\n\n')
                )
            )
        )
    );

    return 1;
}

let removePlayerSpawn = (persistentData, player) => {
    const position = player.block.pos;
    const key = convertFromCoordinatesToKey(position);

    removePersistentData(persistentData, global.PersistentData.PLAYER_SPAWNS, key);
    player.tell(
        Component.red('\n\n=====================================================\n\n').append(
            Component.yellow('Successfully removed spawn point!\n').append(
                Component.gray(`Coordinates: x: ${position.x}, y: ${position.y}, z: ${position.z}`).append(
                    Component.red('\n\n=====================================================\n\n')
                )
            )
        )
    );

    return 1;
}