let waitingPhase = () => {
    const queuedPlayers = getQueuedPlayers();
    if (!startRequirementsMet(queuedPlayers)) return;

    setGameState(persistentData, GAME_STATE.STARTING);
    setCountdown(global.Config.countdown_length);
}

let startRequirementsMet = (queuedPlayers) => {
    if (queuedPlayers == null) return false;
    const queuedPlayerCount = Object.keys(queuedPlayers).length;

    if (queuedPlayerCount < global.Config.min_players || 
        queuedPlayerCount != countVotes(queuedPlayers)) return false;
    return true;
}