BlockEvents.rightClicked('minecraft:dark_oak_wall_sign', event => {
    const text = event.block.entityData.get('front_text').messages;
    if (text.get(0) == '{"text":"[Survival Games]"}' && text.get(2) == '{"text":"Join Game"}') {
        joinLobby(event.player, event.server);

        event.cancel();
    }
})

EntityEvents.death(event => {
    const { entity } = event;
    if (entity.type == 'minecraft:player' && entity.level.name.getString() == 'survivalgames:arena') {
        removePersistentDataArray()
    }
})