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
    const queuedPlayers = persistentData.get(global.PersistentData.QUEUED_PLAYERS);
    const gameProgress = persistentData.get(global.PersistentData.GAME_STATE);

    switch (gameProgress) {
        case global.GameState.WAITING:
            waitingPhase(persistentData, queuedPlayers)
            break;
        case global.GameState.STARTING:
            startingPhase(server, persistentData, queuedPlayers);
            break;
        case global.GameState.INIT:
            initPhase(server);
            break;
        case global.GameState.STARTED:
            break;
    }
})