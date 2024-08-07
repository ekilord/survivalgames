let createChestMakingTools = (player) => {
    const createChestLore = '["",{"text":"Right Click on a block to make it available as a loot chest","italic":false,"color":"gray"}]';

    player.addItem(Item.of('minecraft:wooden_pickaxe').withNBT({ display: { Name: '["",{"text":"Chest Creator - Common","italic":false,"color":"gray"}]', Lore: [createChestLore] } }));
    player.addItem(Item.of('minecraft:stone_pickaxe').withNBT({ display: { Name: '["",{"text":"Chest Creator - Uncommon","italic":false,"color":"green"}]', Lore: [createChestLore] } }));
    player.addItem(Item.of('minecraft:iron_pickaxe').withNBT({ display: { Name: '["",{"text":"Chest Creator - Rare","italic":false,"color":"blue"}]', Lore: [createChestLore] } }));
    player.addItem(Item.of('minecraft:golden_pickaxe').withNBT({ display: { Name: '["",{"text":"Chest Creator - Epic","italic":false,"color":"dark_purple"}]', Lore: [createChestLore] } }));
    player.addItem(Item.of('minecraft:diamond_pickaxe').withNBT({ display: { Name: '["",{"text":"Chest Creator - Legendary","italic":false,"color":"yellow"}]', Lore: [createChestLore] } }));
    player.addItem(Item.of('minecraft:stick').withNBT({ display: { Name: '["",{"text":"Chest Remover","italic":false,"color":"red"}]', Lore: ['["",{"text":"Right Click on a block to remove it from the available loot chest pool","italic":false,"color":"gray"}]'] } }));
    player.addItem(Item.of('minecraft:paper').withNBT({ display: { Name: '["",{"text":"List Chests","italic":false,"color":"gold"}]', Lore: ['["",{"text":"Right Click to list the loot chest pool","italic":false,"color":"gray"}]'] } }));

    return 1;
}

let createChest = (level, player, position, rarity) => {
    appendPersistentDataDict(level.persistentData, 'chest_locations', convertCoordinatesToKey(position), rarity.rarity)
    level.getBlock(position).set(rarity.block);
    player.tell(
        Component.green('\n\n=====================================================\n\n').append(
            Component.yellow('Successfully created ').append(
                Component[rarity.color](rarity.rarity).append(
                    Component.yellow(' loot chest!\n').append(
                        Component.gray(`Coordinates: x: ${position.x}, y: ${position.y}, z: ${position.z}`).append(
                            Component.green('\n\n=====================================================\n\n')
                        )
                    )
                )
            )
        )
    );
}

let removeChest = (level, player, position) => {
    if (removePersistentDataDict(level.persistentData, 'chest_locations', convertCoordinatesToKey(position))) {
        level.getBlock(position).set('minecraft:air');
        removeChestHightlight(position);
        player.tell(
            Component.red('\n\n=====================================================\n\n').append(
                Component.yellow('Successfully removed loot chest!\n').append(
                    Component.gray(`Coordinates: x: ${position.x}, y: ${position.y}, z: ${position.z}`).append(
                        Component.red('\n\n=====================================================\n\n')
                    )
                )
            )
        );
    }
}


let highlightEveryChest = (level, value) => {
    removeEveryChestHightlight();

    if (value) {
        const chestLocations = level.persistentData.get('chest_locations');
        for (const key of Object.keys(chestLocations)) {
            let coord = convertToCoordinatesFromKey(key);
            let position = new BlockPos(coord.x, coord.y, coord.z);
            createChestHighlight(position);
        }
    }

    return 1;
}

let removeEveryChestHightlight = () => {
    Utils.server.runCommandSilent('kill @e[type=minecraft:block_display]');
}

let createChestHighlight = (position) => {
    Utils.server.runCommandSilent(`summon block_display ${position.x - 0.0000001} ${position.y} ${position.z - 0.0000001} {Passengers:[{id:"minecraft:block_display",block_state:{Name:"minecraft:chest",Properties:{}},transformation:[1.0000f,0.0000f,0.0000f,0.0000f,0.0000f,1.0000f,0.0000f,0.0000f,0.0000f,0.0000f,1.0000f,0.0000f,0.0000f,0.0000f,0.0000f,1.0000f],Glowing:1}]}`);
}

let removeChestHightlight = (position) => {
    Utils.server.runCommandSilent(`kill @e[x=${position.x},y=${position.y},z=${position.z},distance=..1,type=minecraft:block_display]`);
}