// __      __     _    _                  _____              _                   
// \ \    / /    | |  (_)                / ____|            | |                  
//  \ \  / /___  | |_  _  _ __    __ _  | (___   _   _  ___ | |_  ___  _ __ ___  
//   \ \/ // _ \ | __|| || '_ \  / _` |  \___ \ | | | |/ __|| __|/ _ \| '_ ` _ \ 
//    \  /| (_) || |_ | || | | || (_| |  ____) || |_| |\__ \| |_|  __/| | | | | |
//     \/  \___/  \__||_||_| |_| \__, | |_____/  \__, ||___/ \__|\___||_| |_| |_|
//                                __/ |           __/ |                          
//                               |___/           |___/                           

let vote = (player) => {
    const name = player.getName().getString();

    const result = playerVote(name);

    switch (result) {
        case 'success':
            const queuedPlayers = getQueuedPlayers();
            const votesCurrent = countVotes(queuedPlayers);
            const votesNeeded = Object.keys(queuedPlayers).length;

            Utils.server.tell(Component.gold(name).append(Component.darkGreen(' has voted to start the game!').append(Component.gold(` (${votesNeeded}/${votesCurrent})`))));

            changePhase();
            break;
        case 'has_voted':
            player.tell(Component.red('You have already voted!'));
            break;
        case 'unqueued':
            player.tell(Component.red('You have not joined the queue yet!'));
            break;
    }

    return 1;
}

let unvote = (player) => {
    const name = player.getName().getString();

    const result = playerUnvote(name);

    switch (result) {
        case 'success':
            const queuedPlayers = getQueuedPlayers();
            const votesTotal = countVotes(queuedPlayers);
            const votesNeeded = Object.keys(queuedPlayers).length;

            Utils.server.tell(Component.darkRed(name).append(Component.gold(' has withdrawn their vote!').append(Component.gold(` (${votesNeeded}/${votesTotal})`))));

            changePhase();
            break;
        case 'not_voted':
            player.tell(Component.red('You have not voted yet!'));
            break;
        case 'unqueued':
            player.tell(Component.red('You have not joined the queue yet!'));
            break;
    }

    return 1;
}

let countVotes = (queuedPlayers) => {
    let count = 0;

    for (const value of Object.values(queuedPlayers)) {
        if (value === 'true') ++count;
    }

    return count;
}