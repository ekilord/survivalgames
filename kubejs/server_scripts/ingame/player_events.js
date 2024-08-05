PlayerEvents.loggedIn(event => {
    const { player } = event;
    event.server.runCommandSilent(`title ${player.name.getString()} times 0.15s 0.7s 0.15s`)
})

EntityEvents.death(event => {
    const { entity } = event;
    if (entity.type == 'minecraft:player' && entity.level.name.getString() == 'survivalgames:arena') {
        removePersistentDataArray()
    }
})

BlockEvents.rightClicked('minecraft:dark_oak_wall_sign', event => {
    const text = event.block.entityData.get('front_text').messages;
    if (text.get(0) == '{"text":"[Survival Games]"}' && text.get(2) == '{"text":"Join Game"}') {
        joinQueue(event.player, event.server);

        event.cancel();
    }
})