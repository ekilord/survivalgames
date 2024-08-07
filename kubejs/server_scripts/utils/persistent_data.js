let checkPersistentDataDict = (holder, dataName, key) => {
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

let appendPersistentDataSet = (holder, dataName, key) => {
    let data = holder.get(dataName) || '';
    const set = new StringSet();
    Utils.server.tell(`from: ${data}`)
    set.from(data);
    const result = set.add(key);
    if (result) holder.put(dataName, set.data);
    return result;
}

let removePersistentDataSet = (holder, dataName, key) => {
    let data = holder.get(dataName) || '';
    const set = new StringSet();
    set.from(data);
    const result = set.remove(key);
    if (result) holder.put(dataName, set.data);
    return result;
}