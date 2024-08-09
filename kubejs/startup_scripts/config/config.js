const config_path = 'survivalgames/config.json';

const DefaultConfig = {
    min_players: 2,
    countdown_length: 30,
}

StartupEvents.init(() => {
    const config = JsonIO.read(config_path);

    if (verifyConfigValidity(config)) {
        global.Config = config;
    }
    else {
        JsonIO.write(config_path, DefaultConfig);
    }
    
})

let verifyConfigValidity = (config) => {
    if (config === null) return false;
    for (const key of Object.keys(config)) {
        if (!(key in DefaultConfig)) {
            return false;
        }
    }
    return true;
}