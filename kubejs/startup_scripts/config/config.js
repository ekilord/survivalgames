StartupEvents.init(event => {
    const config = JsonIO.read(global.Constants.config_path);
    console.log(config)

    if (verifyConfigValidity(config)) {
        global.config = config;
    }
    else {
        JsonIO.write(global.Constants.config_path, global.Constants.default_config);
    }
    
})

let verifyConfigValidity = (config) => {
    if (config === null) return false;
    for (const key of Object.keys(config)) {
        if (!(key in global.Constants.default_config)) {
            return false;
        }
    }
    return true;
}