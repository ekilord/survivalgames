PlayerEvents.loggedIn(event => {
    const { server, player } = event;
    server.runCommandSilent(`title ${player.name.getString()} times 0.15s 0.7s 0.15s`);
    teleportToSpawn(player);
})

PlayerEvents.loggedOut(event => {
    const { server, player } = event;
    leaveQueue(server, player);
    leaveGame(server, player, false);
})

EntityEvents.death(event => {
    const { server, entity } = event;
    if (entity.type == 'minecraft:player' && entity.level.name.getString() == global.Constants.arenaLevel) {
        leaveGame(server, entity, false);
    }
})

BlockEvents.rightClicked('minecraft:dark_oak_wall_sign', event => {
    const text = event.block.entityData.get('front_text').messages;
    if (text.get(0) == '{"text":"[Survival Games]"}' && text.get(2) == '{"text":"Join Game"}') {
        joinQueue(event.server, event.player);

        event.cancel();
    }
})

let teleportToSpawn = (player) => {
    player.teleportTo('minecraft:overworld', 0, 80, 0, 0, 0);
}