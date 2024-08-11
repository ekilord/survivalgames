let createPlayerSpawn = (player) => {
    const position = player.block.pos;
    const positionKey = convertFromCoordinatesToKey(position);
    const spawnPoints = getPlayerSpawnPoints();
    const order = (spawnPoints == null ? 0 : Object.keys(spawnPoints).length);

    addPlayerSpawnPoint(positionKey, order);

    player.tell(
        Component.green('\n\n=====================================================\n\n').append(
            Component.yellow(`Succesfully create spawn point ${order}!\n`).append(
                Component.gray(`Coordinates: x: ${position.x}, y: ${position.y}, z: ${position.z}`).append(
                    Component.green('\n\n=====================================================\n\n')
                )
            )
        )
    );

    return 1;
}

let removePlayerSpawn = (player) => {
    const position = player.block.pos;
    const key = convertFromCoordinatesToKey(position);

    removePlayerSpawnPoint(key);
    
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