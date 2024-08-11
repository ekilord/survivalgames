//  __  __         _         _       _____   _                       
// |  \/  |       | |       | |     |  __ \ | |                      
// | \  / |  __ _ | |_  ___ | |__   | |__) || |__    __ _  ___   ___ 
// | |\/| | / _` || __|/ __|| '_ \  |  ___/ | '_ \  / _` |/ __| / _ \
// | |  | || (_| || |_| (__ | | | | | |     | | | || (_| |\__ \|  __/
// |_|  |_| \__,_| \__|\___||_| |_| |_|     |_| |_| \__,_||___/ \___|

let matchPhase = () => {
    const tickCount = Utils.server.tickCount;
    if (tickCount % 20 != 0) return;

    let seconds = parseInt(getMatchTime().getAsString());

    if (seconds in Events) {
        Events[seconds].functionToRun(seconds);
    }
    
    incrementMatchTime();
}