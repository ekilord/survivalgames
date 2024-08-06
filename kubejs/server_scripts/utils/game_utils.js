//  __  __         _         _        _____              _                   
// |  \/  |       | |       | |      / ____|            | |                  
// | \  / |  __ _ | |_  ___ | |__   | (___   _   _  ___ | |_  ___  _ __ ___  
// | |\/| | / _` || __|/ __|| '_ \   \___ \ | | | |/ __|| __|/ _ \| '_ ` _ \ 
// | |  | || (_| || |_| (__ | | | |  ____) || |_| |\__ \| |_|  __/| | | | | |
// |_|  |_| \__,_| \__|\___||_| |_| |_____/  \__, ||___/ \__|\___||_| |_| |_|
//                                            __/ |                          
//                                           |___/                           


let setupGame = (server, level) => {

    return 1;
}

let stopGame = (server, level) => {
    const persistentData = server.persistentData;
    let queuedPlayers = persistentData.get('queued_players');

    for (const key of Object.keys(queuedPlayers)) {
        queuedPlayers[key] = 'false';
    }
    persistentData.remove('joined_players');
    persistentData.put('game_progress', 'waiting');

    return 1;
}

let leaveGame = (server, player, intentional) => {
    const persistentData = server.persistentData;
    let text = '';

    if (persistentData.get('game_progress') == 'started') {
        const name = player.getName().getString()
        if (intentional) {
            text = 'left the match';
        }
        else {
            text = 'been killed';
        }

        if (checkPersistentDataDict(persistentData, 'joined_players', name)) {
            removePersistentDataArray(persistentData, 'joined_players', name);
            const joinedPlayers = persistentData.get('joined_players');
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
}

let generateChests = (level) => {
    const chestLocations = level.persistentData.get("chest_locations");

    for (const [key, value] of Object.entries(chestLocations)) {
        let coord = convertToCoordinatesFromKey(key);
        let block = level.getBlock(new BlockPos(coord.x, coord.y, coord.z));
        block.set('minecraft:chest');
        block.setEntityData({ LootTable: `survivalgames:chests/${value.rarity}`, CustomName: `{"bold":true,"color":"${value.color}","text":"${value.rarity}"}` });
    }
}

let teleportPlayers = (level) => {

}

let initPlayers = (persistentData) => {
    const queuedPlayers = persistentData.get('queued_players');
    let joinedPlayers = [];

    for (const key of Object.keys(queuedPlayers)) {
        joinedPlayers.push(key);
    }
    appendPersistentDataArray(persistentData, 'joined_players', joinedPlayers);
}

let initCountdown = (level) => {

}

//  ____                               _____              _                   
// / __ \                             / ____|            | |                  
// | |  | | _   _   ___  _   _   ___  | (___   _   _  ___ | |_  ___  _ __ ___  
// | |  | || | | | / _ \| | | | / _ \  \___ \ | | | |/ __|| __|/ _ \| '_ ` _ \ 
// | |__| || |_| ||  __/| |_| ||  __/  ____) || |_| |\__ \| |_|  __/| | | | | |
// \___\_\ \__,_| \___| \__,_| \___| |_____/  \__, ||___/ \__|\___||_| |_| |_|
//                                             __/ |                          
//                                            |___/                           


let joinQueue = (server, player) => {
    const name = player.getName().getString();
    const persistentData = server.persistentData;

    const result = modifyQueue(persistentData, 'queued_players', name, 'false');

    switch (result) {
        case 'added':
            server.tell(Component.gold(name).append(Component.gray(' has joined the queue!')));
            break;
        case 'mismatch':
            player.tell(Component.red('You have already joined the queue!'));
            break;
    }

    return 1;
}

let leaveQueue = (server, player) => {
    if (server.persistentData.get('game_progress') == 'waiting' || server.persistentData.get('game_progress') == 'starting') {
        const name = player.getName().getString();
        const persistentData = server.persistentData;

        const result = modifyQueue(persistentData, 'queued_players', name, 'false');

        switch (result) {
            case 'mismatch':
                player.tell(Component.red('You have not joined the queue yet!'));
                break;
            case 'removed':
                server.tell(Component.red(name).append(Component.yellow(' has left the queue!')));
                break;
        }
    }
    else {
        player.tell(Component.red("You can't leave the queue now!\n").append(Component.gray('Use /sg leave')));
    }

    return 1;
}

let modifyQueue = (holder, dataName, key, value = '') => {
    let data = holder.get(dataName) || {};

    if (value != '') {
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

// __      __     _    _                  _____              _                   
// \ \    / /    | |  (_)                / ____|            | |                  
//  \ \  / /___  | |_  _  _ __    __ _  | (___   _   _  ___ | |_  ___  _ __ ___  
//   \ \/ // _ \ | __|| || '_ \  / _` |  \___ \ | | | |/ __|| __|/ _ \| '_ ` _ \ 
//    \  /| (_) || |_ | || | | || (_| |  ____) || |_| |\__ \| |_|  __/| | | | | |
//     \/  \___/  \__||_||_| |_| \__, | |_____/  \__, ||___/ \__|\___||_| |_| |_|
//                                __/ |           __/ |                          
//                               |___/           |___/                           


let playerVote = (server, player) => {
    const name = player.getName().getString();
    const persistentData = server.persistentData;

    const result = modifyVote(persistentData, 'queued_players', name, 'true');

    switch (result) {
        case 'success':
            server.tell(Component.darkPurple(name).append(Component.darkGreen(' has voted to start the game!')));
            break;
        case 'mismatch':
            player.tell(Component.red('You have already voted!'));
            break;
        case 'unqueued':
            player.tell(Component.red('You have not joined the queue yet!'));
            break;
    }

    return 1;
}

let playerUnvote = (server, player) => {
    const name = player.getName().getString();
    const persistentData = server.persistentData;

    const result = modifyVote(persistentData, 'queued_players', name, 'false');

    switch (result) {
        case 'success':
            server.tell(Component.darkPurple(name).append(Component.darkRed(' has withdrawn their vote!')));
            break;
        case 'mismatch':
            player.tell(Component.red('You have already withdrawn your vote!'));
            break;
        case 'unqueued':
            player.tell(Component.red('You have not joined the queue yet!'));
            break;
    }

    return 1;
}

let modifyVote = (holder, dataName, key, value) => {
    let data = holder.get(dataName) || {};

    if (Object.keys(data).length > 0) {
        if (key in data && data[key] != value) {
            data[key] = value;
            holder.put(dataName, data);

            return 'success';
        }

        return 'mismatch';
    }

    return 'unqueued';
}