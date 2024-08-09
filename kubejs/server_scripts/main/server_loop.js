//   _____                                 _                          
//  / ____|                               | |                         
// | (___    ___  _ __ __   __ ___  _ __  | |      ___    ___   _ __  
//  \___ \  / _ \| '__|\ \ / // _ \| '__| | |     / _ \  / _ \ | '_ \ 
//  ____) ||  __/| |    \ V /|  __/| |    | |____| (_) || (_) || |_) |
// |_____/  \___||_|     \_/  \___||_|    |______|\___/  \___/ | .__/ 
//                                                             | |    
//                                                             |_|    

ServerEvents.tick(() => {
    const gameState = getGameState();

    switch (gameState) {
        case GameState.WAITING:
            waitingPhase();
            break;
        case GameState.STARTING:
            startingPhase();
            break;
        case GameState.INIT:
            initPhase();
            break;
        case GameState.STARTED:
            matchPhase();
            break;
    }
    
})