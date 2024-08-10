let startingPhase = () => {
    const tickCount = Utils.server.tickCount;
    if (tickCount % 20 != 0) return;

    const queuedPlayers = getQueuedPlayers();

    if (startRequirementsMet(queuedPlayers)) {
        let seconds = parseInt(getCountdown().getAsString());

        server.runCommandSilent(`title @a actionbar {"text":"${seconds.toString()}","bold":true,"color":"white"}}`)

        setCountdown(--seconds);

        if (seconds <= 0) {
            setGameState(GameState.INIT);
            return;
        }
    }
    else {
        setGameState(GameState.WAITING);
    }
}