let matchPhase = () => {
    checkWinner();
}

let checkWinner = () => {
    const players = Utils.server.getLevel(Constants.arenaLevel).getPlayers();

    switch (aliveTotal) {
        case 1:
            const player = players[0];
            player.teleportTo(Constants.lobbyLevel, 0, 100, 0, 0, 0);
            server.tell(
                Component.darkGreen('\n\n\n=====================================================\n\n').append(
                    Component.gold(player.getName().getString()).append(
                        Component.green(' has won the game!').append(
                            Component.darkGreen('\n\n=====================================================\n\n\n')
                        )
                    )
                ));
            break;
        case 0:
            server.tell(
                Component.darkPurple('\n\n\n*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*\n\n').append(
                    Component.red('A critical error has been encountered, restarting game!').append(
                        Component.darkPurple('\n\n*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*\n\n\n')
                    )
                ));
            break;
    }

    stopGame();
}


let stopGame = () => {
    const queuedPlayers = getQueuedPlayers();

    for (const key of Object.keys(queuedPlayers)) {
        queuedPlayers[key] = 'false';
    }

    clearJoinedPlayers();

    setGameState(GAME_STATE.WAITING);
}