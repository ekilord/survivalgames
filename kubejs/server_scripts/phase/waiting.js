// __          __     _  _    _                 _____   _                       
// \ \        / /    (_)| |  (_)               |  __ \ | |                      
//  \ \  /\  / /__ _  _ | |_  _  _ __    __ _  | |__) || |__    __ _  ___   ___ 
//   \ \/  \/ // _` || || __|| || '_ \  / _` | |  ___/ | '_ \  / _` |/ __| / _ \
//    \  /\  /| (_| || || |_ | || | | || (_| | | |     | | | || (_| |\__ \|  __/
//     \/  \/  \__,_||_| \__||_||_| |_| \__, | |_|     |_| |_| \__,_||___/ \___|
//                                       __/ |                                  
//                                      |___/                                   

let waitingPhase = () => {

}

let changePhase = () => {
    const gameState = getGameState();
    const queuedPlayers = getQueuedPlayers();

    if (startRequirementsMet(queuedPlayers)) {
        if (gameState === GameState.WAITING) {
            setGameState(GameState.STARTING);
            setCountdown(Config.startingCountdownLength);
        }

    }
    else {
        if (gameState === GameState.STARTING) {
            setGameState(GameState.WAITING);
        }
    }
    
}

let startRequirementsMet = (queuedPlayers) => {
    if (queuedPlayers == null) return false;
    
    const queuedPlayerCount = Object.keys(queuedPlayers).length;

    if (queuedPlayerCount < Config.minPlayers || 
        queuedPlayerCount != countVotes(queuedPlayers)) {
            return false;
        } 

    return true;
}