//  __  __         _         _        _____              _                   
// |  \/  |       | |       | |      / ____|            | |                  
// | \  / |  __ _ | |_  ___ | |__   | (___   _   _  ___ | |_  ___  _ __ ___  
// | |\/| | / _` || __|/ __|| '_ \   \___ \ | | | |/ __|| __|/ _ \| '_ ` _ \ 
// | |  | || (_| || |_| (__ | | | |  ____) || |_| |\__ \| |_|  __/| | | | | |
// |_|  |_| \__,_| \__|\___||_| |_| |_____/  \__, ||___/ \__|\___||_| |_| |_|
//                                            __/ |                          
//                                           |___/                           


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
                Utils.server.tell(Component.gold(name)
                    .append(Component.red(` has ${text}!\n`)
                        .append(Component.yellow(`${playerCount} people remain!`))));
                break;
        }

        return true;
    }

    return false;
}

let finishGame = () => {
    const players = Utils.server.getLevel(Constants.arenaLevel).getPlayers();
    const player = players[0];

    Utils.server.tell(
        Component.darkGreen('\n\n\n=====================================================\n\n').append(
            Component.gold(player.getName().getString()).append(
                Component.green(' has won the game!').append(
                    Component.darkGreen('\n\n=====================================================\n\n')
                )
            )
        ));
}

let errorEncountered = () => {
    Utils.server.tell(
        Component.darkPurple('\n\n\n*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*\n\n').append(
            Component.red('A critical error has been encountered, restarting game!').append(
                Component.darkPurple('\n\n*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*\n\n'))));
}

let stopGame = () => {
    turnOffPvp();
    resetVotes();
    clearJoinedPlayers();

    Utils.server.getLevel(Constants.arenaLevel).getPlayers().forEach(player => {
        teleportToSpawn(player);
    });

    setGameState(GameState.WAITING);

}

let forceStopGame = () => {
    stopGame();
    Utils.server.tell(Component.red('Game has been force stopped!'));
    return 1;
}

let setSpawnPointCage = (block) => {
    const spawnPoints = getPlayerSpawnPoints();
    const level = Utils.server.getLevel(Constants.arenaLevel);

    for (const spawnPoint of Object.keys(spawnPoints)) {
        let position = convertToCoordinatesFromKey(spawnPoint);
        let blockPos = new BlockPos(position.x, position.y, position.z);

        level.getBlock(blockPos.north(1)).set(block);
        level.getBlock(blockPos.west(1)).set(block);
        level.getBlock(blockPos.south(1)).set(block);
        level.getBlock(blockPos.east(1)).set(block);

        level.getBlock(blockPos.above(1).north(1)).set(block);
        level.getBlock(blockPos.above(1).west(1)).set(block);
        level.getBlock(blockPos.above(1).south(1)).set(block);
        level.getBlock(blockPos.above(1).east(1)).set(block);

        level.getBlock(blockPos.above(2).north(1)).set(block);
        level.getBlock(blockPos.above(2).west(1)).set(block);
        level.getBlock(blockPos.above(2).south(1)).set(block);
        level.getBlock(blockPos.above(2).east(1)).set(block);

        level.getBlock(blockPos.above(3)).set(block);
    }
}