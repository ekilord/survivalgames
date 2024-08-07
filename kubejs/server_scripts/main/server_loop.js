//   _____                                 _                          
//  / ____|                               | |                         
// | (___    ___  _ __ __   __ ___  _ __  | |      ___    ___   _ __  
//  \___ \  / _ \| '__|\ \ / // _ \| '__| | |     / _ \  / _ \ | '_ \ 
//  ____) ||  __/| |    \ V /|  __/| |    | |____| (_) || (_) || |_) |
// |_____/  \___||_|     \_/  \___||_|    |______|\___/  \___/ | .__/ 
//                                                             | |    
//                                                             |_|    


ServerEvents.tick(event => {
    const { server } = event;
    const persistentData = server.persistentData;
    const queuedPlayers = persistentData.get(PersistentData.QUEUED_PLAYERS);
    const gameProgress = persistentData.get(PersistentData.GAME_STATE);

    switch (gameProgress) {
        case GameState.WAITING:
            waitingPhase(persistentData, queuedPlayers)
            break;
        case GameState.STARTING:
            startingPhase(server, persistentData, queuedPlayers);
            break;
        case GameState.INIT:
            initPhase(server);
            break;
        case GameState.STARTED:
            break;
    }
})