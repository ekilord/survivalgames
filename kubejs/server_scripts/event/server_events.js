//   _____                                 ______                   _        
//  / ____|                               |  ____|                 | |       
// | (___    ___  _ __ __   __ ___  _ __  | |__ __   __ ___  _ __  | |_  ___ 
//  \___ \  / _ \| '__|\ \ / // _ \| '__| |  __|\ \ / // _ \| '_ \ | __|/ __|
//  ____) ||  __/| |    \ V /|  __/| |    | |____\ V /|  __/| | | || |_ \__ \
// |_____/  \___||_|     \_/  \___||_|    |______|\_/  \___||_| |_| \__||___/

ServerEvents.loaded(event => {
    const { server } = event;
    global.persistentData = server.persistentData;
    createMatchEvents();

    clearPersistentData(PersistentData.QUEUED_PLAYERS);
    clearPersistentData(PersistentData.JOINED_PLAYERS);
    turnOffPvp();
    setGameState(GameState.WAITING);
})
