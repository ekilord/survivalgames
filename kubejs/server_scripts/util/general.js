let convertFromCoordinatesToKey = (key) => {
    return `${key.x},${key.y},${key.z}`
}

let convertToCoordinatesFromKey = (key) => {
    const numbers = key.split(',').map(Number);
    return {
        x: numbers[0],
        y: numbers[1],
        z: numbers[2]
    };
}

let invertKeyValuePairs = (obj) => {
    return Object.keys(obj).reduce((ret, key) => {
        ret[obj[key]] = key;
        return ret;
    }, {});
}

let teleportToSpawn = (player) => {
    player.teleportTo('minecraft:overworld', 0, 80, 0, 0, 0);
}