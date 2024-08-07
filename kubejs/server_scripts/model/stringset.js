let stringSetAdd = (value) => {
    Utils.server.tell(`value: ${value}`);
    Utils.server.tell(`data: ${this.data}`);
    if (!this.has(value)) {
        this.data += (this.data ? ';' : '') + value;
        return true;
    }
    return false;
};

let stringSetRemove = (value) => {
    const values = this.data.split(";");
    const index = values.indexOf(value);
    if (index !== -1) {
        values.splice(index, 1);
        this.data = values.join(";");
        return true;
    }
    return false;
};

let stringSetHas = (value) => {
    return this.data.includes(value);
};

let stringSetFrom = (value) => {
    //value = String(value);
    const values = value.split(";");
    Utils.server.tell(`split: ${values}`)
    //values.forEach(value => set.add(value.trim()));
    return set;
};


