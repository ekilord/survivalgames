//   _____  _                _    _                 _____   _                       
//  / ____|| |              | |  (_)               |  __ \ | |                      
// | (___  | |_  __ _  _ __ | |_  _  _ __    __ _  | |__) || |__    __ _  ___   ___ 
//  \___ \ | __|/ _` || '__|| __|| || '_ \  / _` | |  ___/ | '_ \  / _` |/ __| / _ \
//  ____) || |_| (_| || |   | |_ | || | | || (_| | | |     | | | || (_| |\__ \|  __/
// |_____/  \__|\__,_||_|    \__||_||_| |_| \__, | |_|     |_| |_| \__,_||___/ \___|
//                                           __/ |                                  
//                                          |___/                                   


let startingPhase = () => {
    const tickCount = Utils.server.tickCount;
    if (tickCount % 20 != 0) return;

    let seconds = parseInt(getCountdown().getAsString());

    Utils.server.runCommandSilent(`title @a actionbar {"text":"${seconds.toString()}","bold":true,"color":"white"}}`)

    setCountdown(--seconds);

    if (seconds <= 0) {
        setGameState(GameState.INIT);
        return;
    }
}

