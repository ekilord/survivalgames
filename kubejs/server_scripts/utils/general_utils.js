let convertCoordinatesToKey = (key) => {
    return `${key.x};${key.y};${key.z}`
}

let convertToCoordinatesFromKey = (key) => {
    const numbers = key.split(';').map(Number);
    return {
        x: numbers[0],
        y: numbers[1],
        z: numbers[2]
    };
}

let checkPersistentData = (holder, dataName, key) => {
    let data = holder.get(dataName) || {};
    if (Object.keys(data).length > 0) {
        if (data[key] !== undefined) {
            return true;
        }
    }
    return false;
}

let appendPersistentDataDict = (holder, dataName, key, value) => {
    let data = holder.get(dataName) || {};
    data[key] = value;
    holder.put(dataName, data);
}

let removePersistentDataDict = (holder, dataName, key) => {
    let data = holder.get(dataName) || {};
    if (Object.keys(data).length > 0) {
        if (data[key] !== undefined) {
            delete data[key];
            holder.put(dataName, data);
            return true;
        }
    }
    return false;
}

let appendPersistentDataArray = (holder, dataName, element) => {
    let data = holder.get(dataName) || [];
    data = Array.from(data);
    data = new Set(data);
    data.add(element);
    data = '["' + Array.from(data).join('", "') + '"]';
    holder.put(dataName, data);
}

let removePersistentDataArray = (holder, dataName, element) => {
    let data = holder.get(dataName) || [];
    data = Array.from(data);
    if (data.length > 0) {
        data = new Set(data);
        if (data.includes(element)) {
            data.remove(element);
            data = '["' + Array.from(data).join('", "') + '"]';
            holder.put(dataName, data);
            return true;
        }
    }
    return false;
}