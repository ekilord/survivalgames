//   ____                               _____              _                   
//  / __ \                             / ____|            | |                  
// | |  | | _   _   ___  _   _   ___  | (___   _   _  ___ | |_  ___  _ __ ___  
// | |  | || | | | / _ \| | | | / _ \  \___ \ | | | |/ __|| __|/ _ \| '_ ` _ \ 
// | |__| || |_| ||  __/| |_| ||  __/  ____) || |_| |\__ \| |_|  __/| | | | | |
//  \___\_\ \__,_| \___| \__,_| \___| |_____/  \__, ||___/ \__|\___||_| |_| |_|
//                                              __/ |                          
//                                             |___/                           


let joinQueue = (server, player) => {
    const name = player.getName().getString();
    const persistentData = server.persistentData;

    if (queuedPlayersTotal >= availableSlotsTotal) {
        player.tell(Component.red('The queue is already full, try waiting!'));
    }

    const result = modifyQueue(persistentData, global.PersistentData.QUEUED_PLAYERS, name, 'false');

    switch (result) {
        case 'added':
            const minPlayers = global.config.min_players;
            const queuedPlayersTotal = Object.keys(persistentData.get(global.PersistentData.QUEUED_PLAYERS)).length;
            const availableSlotsTotal = Object.keys(persistentData.get(global.PersistentData.PLAYER_SPAWNS)).length;

            server.tell(Component.gold(name).append(Component.green(' has joined the queue!').append(Component.gold(` (${availableSlotsTotal}/${queuedPlayersTotal})`))));
            if (queuedPlayersTotal < minPlayers) server.tell(Component.gray(`${minPlayers - queuedPlayersTotal} more players are required to start the game!`));
            break;
        case 'mismatch':
            player.tell(Component.red('You have already joined the queue!'));
            break;
    }

    return 1;
}

let leaveQueue = (server, player) => {
    const persistentData = server.persistentData;

    if (persistentData.get(global.PersistentData.GAME_STATE) == global.GameState.WAITING ||
        persistentData.get(global.PersistentData.GAME_STATE) == global.GameState.STARTING) {
        const name = player.getName().getString();

        const result = modifyQueue(persistentData, global.PersistentData.QUEUED_PLAYERS, name);

        switch (result) {
            case 'mismatch':
                player.tell(Component.red('You have not joined the queue yet!'));
                break;
            case 'removed':
                const queuedPlayersTotal = Object.keys(persistentData.get(global.PersistentData.QUEUED_PLAYERS)).length;
                const availableSlotsTotal = Object.keys(persistentData.get(global.PersistentData.PLAYER_SPAWNS)).length;

                server.tell(Component.red(name).append(Component.yellow(' has left the queue!').append(Component.gold(` (${availableSlotsTotal}/${queuedPlayersTotal})`))));
                break;
        }
    }
    else {
        player.tell(Component.red("You can't leave the queue now!\n").append(Component.gray('   -> Use /sg leave')));
    }

    return 1;
}

let modifyQueue = (holder, dataName, key, value) => {
    let data = holder.get(dataName) || {};

    if (value != null) {
        if (key in data) {
            return 'mismatch';
        }
        else {
            data[key] = value;
            holder.put(dataName, data);
            return 'added';
        }
    }
    else {
        if (key in data) {
            delete data[key];
            holder.put(dataName, data);
            return 'removed';
        }
        else {
            return 'mismatch';
        }
    }
}