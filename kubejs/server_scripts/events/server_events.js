ServerEvents.loaded(event => {
    const { server } = event;
    const persistentData = server.persistentData;

    persistentData.remove(PersistentData.QUEUED_PLAYERS);
    persistentData.remove(PersistentData.JOINED_PLAYERS);
    persistentData.put(PersistentData.GAME_STATE, GameState.WAITING);
})
