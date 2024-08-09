ServerEvents.loaded(event => {
    const { server } = event;
    global.persistentData = server.persistentData;

    clearPersistentData(PersistentData.QUEUED_PLAYERS);
    clearPersistentData(PersistentData.JOINED_PLAYERS);
    setGameState(GameState.WAITING);
})
