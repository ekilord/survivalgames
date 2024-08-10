let playerLeaveGame = (player) => {
    const name = player.getName().getString();

    if (!removePlayerFromGame(name, 'left the match')) {
        player.tell(Component.red('The game has not started yet!'));
    }

    return 1;
}

let playerKillInMatch = (player) => {
    const name = player.getName().getString();

    if (!removePlayerFromGame(name, 'has been killed')) {
        player.tell(Component.red('An error has been encountered!'));
    }
}

let removePlayerFromGame = (name, text) => {
    if (removePlayerFromMatch(name)) {
        const playerCount = Object.keys(getJoinedPlayers()).length;

        switch (playerCount) {
            case 1:
                finishGame();
                stopGame();
                break;
            case 0:
                errorEncountered();
                stopGame();
                break;
            default:
                server.tell(Component.gold(name)
                    .append(Component.red(` has ${text}!\n`)
                        .append(Component.yellow(`${playerCount} people remain!`))));
                break;
        }

        return true;
    }

    return false;
}

let finishGame = () => {
    server.tell(
        Component.darkGreen('\n\n\n=====================================================\n\n').append(
            Component.gold(player.getName().getString()).append(
                Component.green(' has won the game!').append(
                    Component.darkGreen('\n\n=====================================================\n\n\n')
                )
            )
        ));
}

let errorEncountered = () => {
    server.tell(
        Component.darkPurple('\n\n\n*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*\n\n').append(
            Component.red('A critical error has been encountered, restarting game!').append(
                Component.darkPurple('\n\n*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*\n\n\n'))));
}

let stopGame = () => {
    resetVotes();
    clearJoinedPlayers();

    Utils.server.getLevel(Constants.arenaLevel).getPlayers().forEach(player => {
        teleportToSpawn(player);
    });

    setGameState(GameState.WAITING);
}

let forceStopGame = () => {
    stopGame();
    Utils.server.tell(Component.red('Game has been stopped!'));
}