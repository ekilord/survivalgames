StartupEvents.init(event => {
    const config = JsonIO.read(CONSTANTS.config_path);

    if (verifyConfigValidity(config)) {
        global.config = config;
    }
    else {
        JsonIO.write(CONSTANTS.config_path, CONSTANTS.default_config);
    }
    
})

let verifyConfigValidity = (config) => {
    if (config === null) return false;
    for (const key in Object.keys(config)) {
        if (!(key in CONSTANTS.default_config)) {
            return false;
        }
    }
    return true;
}