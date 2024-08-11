let Events = {}

let createMatchEvents = () => {
    //COUNTDOWN
    addEvent(0 - Config.matchCountdownLength, 'Countdown', displayCountdown, Config.matchCountdownLength - 1, 0);
    addEvent(0, 'Start', startTheGame, 1, 0);

    //TURN ON PVP
    addEvent(Config.endGracePeriod, 'EndGracePeriod', endGracePeriod, 1, 0);
}

let addEvent = (start, name, functionToRun, occurences, delay) => {
    const realStart = Config.matchStartDelay + Config.matchCountdownLength + start;

    for (let i = 0; i < occurences; ++i) {
        Events[realStart + i + i*delay] = {
            eventName: name,
            functionToRun: function(seconds){
                functionToRun(seconds);
            },
        };
    }
}

let makeAnnouncement = (text) => {
    Utils.server.tell(
        Component.darkPurple('*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*\n').append(
            Component.red(`${text}`).append(
                Component.darkPurple('\n*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*'))));
}

let createTimer = (id, displayName, max, color) => {
    Utils.server.runCommandSilent(`bossbar add ${id} "${displayName}"`);
    Utils.server.runCommandSilent(`bossbar set ${id} max ${max}`);
    Utils.server.runCommandSilent(`bossbar set ${id} color ${color}`);
    Utils.server.runCommandSilent(`bossbar set ${id} players @a`);
    
    
}

let changeTimer = (id, value) => {
    const percent = 
    Utils.server.runCommandSilent(`bossbar set ${id} value ${percent}`);
}

let displayCountdown = (seconds) => {
    Utils.server.runCommandSilent(`title @a title {"text":"${(Config.matchCountdownLength + Config.matchStartDelay - seconds).toString()}","bold":true,"color":"green"}}`);
}

let startTheGame = (seconds) => {
    Utils.server.runCommandSilent(`title @a title {"text":"${(Config.matchCountdownLength + Config.matchStartDelay - seconds).toString()}","bold":true,"color":"green"}}`);
    setSpawnPointCage('minecraft:air');
}


let endGracePeriod = () => {
    makeAnnouncement('The grace period has ended! ')
    turnOnPvp();
}