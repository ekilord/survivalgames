let checkPersistentData = (holder, dataName, key) => {
    let data = holder.get(dataName) || {};
    
    if (Object.keys(data).length > 0) {
        if (data[key] !== undefined) {
            return true;
        }
    }

    return false;
}

let addPersistentData = (holder, dataName, key, value) => {
    let data = holder.get(dataName) || {};
    data[key] = value;
    holder.put(dataName, data);
}

let removePersistentData = (holder, dataName, key) => {
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