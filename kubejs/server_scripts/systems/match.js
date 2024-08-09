//TODO NAGYON RONDA KONYORGOM JAVITSD KI
let leaveGame = (server, player, intentional) => {
    const gameState = getGameState();
    let text = '';

    if (gameState === GameState.STARTED) {
        const name = player.getName().getString()
        if (intentional) {
            text = 'left the match';
        }
        else {
            text = 'been killed';
        }

        if (persistentDataContains(persistentData, PersistentData.JOINED_PLAYERS, name)) {
            removePersistentData(persistentData, PersistentData.JOINED_PLAYERS, name);
            const joinedPlayers = persistentData.get(PersistentData.JOINED_PLAYERS);
            const playerCount = Object.keys(joinedPlayers).length;

            server.tell(Component.gold(name)
                .append(Component.red(` has ${text}!\n`)
                    .append(Component.yellow(`${playerCount} people remain!`))));
        }
    }
    else {
        if (intentional) {
            player.tell(Component.red('The game has not started yet!'));
        }
    }
    return 1;
}