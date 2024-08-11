//   ____                               _____              _                   
//  / __ \                             / ____|            | |                  
// | |  | | _   _   ___  _   _   ___  | (___   _   _  ___ | |_  ___  _ __ ___  
// | |  | || | | | / _ \| | | | / _ \  \___ \ | | | |/ __|| __|/ _ \| '_ ` _ \ 
// | |__| || |_| ||  __/| |_| ||  __/  ____) || |_| |\__ \| |_|  __/| | | | | |
//  \___\_\ \__,_| \___| \__,_| \___| |_____/  \__, ||___/ \__|\___||_| |_| |_|
//                                              __/ |                          
//                                             |___/                           


let queue = (player) => {
    const name = player.getName().getString();
    let queuedPlayersTotal = Object.keys(getQueuedPlayers()).length;
    const availableSlotsTotal = Object.keys(getPlayerSpawnPoints()).length;

    if (queuedPlayersTotal >= availableSlotsTotal) {
        player.tell(Component.red('The queue is already full, try waiting!'));
        return 1;
    }

    if (playerQueue(name)) {
        const minPlayers = Config.minPlayers;
        queuedPlayersTotal += 1;

        Utils.server.tell(Component.gold(name).append(Component.green(' has joined the queue!').append(Component.gold(` (${availableSlotsTotal}/${queuedPlayersTotal})`))));
        if (queuedPlayersTotal < minPlayers) Utils.server.tell(Component.gray(`${minPlayers - queuedPlayersTotal} more players are required to start the game!`));

        changePhase();
    }
    else {
        player.tell(Component.red('You have already joined the queue!'));
    }

    return 1;
}

let unqueue = (player) => {
    const gameState = getGameState();

    if (gameState == GameState.WAITING ||
        gameState == GameState.STARTING) {
        const name = player.getName().getString();

        if (playerUnqueue(name)) {
            const queuedPlayersTotal = Object.keys(getQueuedPlayers()).length;
            const availableSlotsTotal = Object.keys(getPlayerSpawnPoints()).length;

            Utils.server.tell(Component.red(name).append(Component.yellow(' has left the queue!').append(Component.gold(` (${availableSlotsTotal}/${queuedPlayersTotal})`))));

            changePhase();
        }
        else {
            player.tell(Component.red('You have not joined the queue yet!'));
        }
    }
    else {
        player.tell(Component.red("You can't leave the queue now!\n").append(Component.gray('   -> Use /sg leave')));
    }

    return 1;
}