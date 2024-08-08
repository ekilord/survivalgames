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

let startRequirementsMet = (dict) => {
    if (dict == null) return false;
    if (Object.keys(dict).length < global.config.min_players || 
        Object.keys(dict).length != countVotes(dict)) return false;
    return true;
}

let countVotes = (dict) => {
    let count = 0;
    for (const value of Object.values(dict)) {
        if (value == 'true') ++count;
    }
    return count;
}
