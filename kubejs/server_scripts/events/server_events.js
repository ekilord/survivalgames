ServerEvents.loaded(event => {
    const { server } = event;
    const persistentData = server.persistentData;

    persistentData.remove(global.PersistentData.QUEUED_PLAYERS);
    persistentData.remove(global.PersistentData.JOINED_PLAYERS);
    persistentData.put(global.PersistentData.GAME_STATE, global.GameState.WAITING);
})
