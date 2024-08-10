PlayerEvents.loggedIn(event => {
    const { server, player } = event;
    server.runCommandSilent(`title ${player.getName().getString()} times 0.15s 0.7s 0.15s`);
    teleportToSpawn(player);
})

PlayerEvents.loggedOut(event => {
    const { player } = event;
    playerUnqueue(player.getName().getString());
    playerLeaveGame(player);
})

EntityEvents.death(event => {
    const { server, entity } = event;
    if (entity.type == 'minecraft:player' && entity.level.getName().getString() == Constants.arenaLevel) {
        playerKillInMatch(entity);
    }
})

BlockEvents.rightClicked('minecraft:dark_oak_wall_sign', event => {
    const text = event.block.entityData.get('front_text').messages;
    if (text.get(0) == '{"text":"[Survival Games]"}' && text.get(2) == '{"text":"Join Game"}') {
        joinQueue(event.server, event.player);

        event.cancel();
    }
})