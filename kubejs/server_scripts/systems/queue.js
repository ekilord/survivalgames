//   ____                               _____              _                   
//  / __ \                             / ____|            | |                  
// | |  | | _   _   ___  _   _   ___  | (___   _   _  ___ | |_  ___  _ __ ___  
// | |  | || | | | / _ \| | | | / _ \  \___ \ | | | |/ __|| __|/ _ \| '_ ` _ \ 
// | |__| || |_| ||  __/| |_| ||  __/  ____) || |_| |\__ \| |_|  __/| | | | | |
//  \___\_\ \__,_| \___| \__,_| \___| |_____/  \__, ||___/ \__|\___||_| |_| |_|
//                                              __/ |                          
//                                             |___/                           


let joinQueue = (player) => {
    const name = player.getName().getString();
    const queuedPlayersTotal = Object.keys(getQueuedPlayers()).length;
    const availableSlotsTotal = Object.keys(getPlayerSpawnPoints()).length;

    if (queuedPlayersTotal >= availableSlotsTotal) {
        player.tell(Component.red('The queue is already full, try waiting!'));
    }

    const result = playerQueued(name, 'false');

    switch (result) {
        case 'success':
            const minPlayers = global.Config.min_players;
            queuedPlayersTotal += 1;

            Utils.server.tell(Component.gold(name).append(Component.green(' has joined the queue!').append(Component.gold(` (${availableSlotsTotal}/${queuedPlayersTotal})`))));
            if (queuedPlayersTotal < minPlayers) Utils.server.tell(Component.gray(`${minPlayers - queuedPlayersTotal} more players are required to start the game!`));
            break;
        case 'error':
            player.tell(Component.red('You have already joined the queue!'));
            break;
    }

    return 1;
}

let leaveQueue = (player) => {
    const gameState = getGameState();

    if (gameState == GameState.WAITING ||
        gameState == GameState.STARTING) {
        const name = player.getName().getString();

        const result = playerUnqueued(name);

        switch (result) {
            case 'success':
                const queuedPlayersTotal = Object.keys(getQueuedPlayers()).length;
                const availableSlotsTotal = Object.keys(getPlayerSpawnPoints()).length;

                server.tell(Component.red(name).append(Component.yellow(' has left the queue!').append(Component.gold(` (${availableSlotsTotal}/${queuedPlayersTotal})`))));
                break;
            case 'error':
                player.tell(Component.red('You have not joined the queue yet!'));
                break;
        }
    }
    else {
        player.tell(Component.red("You can't leave the queue now!\n").append(Component.gray('   -> Use /sg leave')));
    }

    return 1;
}