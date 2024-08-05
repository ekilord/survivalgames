ServerEvents.loaded(event => {
    event.server.persistentData.put('game_progress', 'waiting');
})

ServerEvents.tick(event => {
    const queued_players = event.server.persistentData.get('queued_players');
    const game_progress = event.server.persistentData.get('game_progress');

    switch (game_progress) {
        case 'waiting':
            if (Object.keys(queued_players).length < CONSTANTS.min_players) return;
            if (Object.keys(queued_players).length != countVotes(queued_players)) return;
            event.server.persistentData.put('game_progress', 'starting');
            event.server.persistentData.put('countdown', CONSTANTS.countdown_length);
            break;
        case 'starting':
            if (event.server.tickCount % 20 != 0) return;
            if (Object.keys(queued_players).length < CONSTANTS.min_players || Object.keys(queued_players).length != countVotes(queued_players)) {
                event.server.persistentData.put('game_progress', 'waiting');
            }
            else {
                let seconds = event.server.persistentData.get('countdown');
                seconds = parseInt(seconds.getAsString());

                if (seconds == 30 || seconds == 15) {
                    event.server.tell(Component.gold(seconds.toString())
                    .append(Component.gray(' seconds until the round starts!')));
                }
                else if (seconds <= 10) {
                    event.server.runCommandSilent(`title @a title {"text":"${seconds.toString()}","bold":true,"color":"green"}}`)
                }

                --seconds;
                if (seconds <= 0) {
                    event.server.persistentData.put('game_progress', 'init');
                    return;
                }
                event.server.persistentData.put('countdown', seconds);
            }
            break;
        case 'init':
            setupGame(event.server, event.level);
            break;
        case 'started':
            event.server.tell('WOHOOO');
            break;
    }
})

let countVotes = (dict) => {
    let count = 0;
    for (const value of Object.values(dict)) {
        if (value == 'true') ++count;
    }
    return count;
}
