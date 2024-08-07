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

    const result = modifyVote(persistentData, global.PersistentData.QUEUED_PLAYERS, name, 'true');

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

    const result = modifyVote(persistentData, global.PersistentData.QUEUED_PLAYERS, name, 'false');

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