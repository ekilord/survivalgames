ItemEvents.rightClicked('minecraft:wooden_pickaxe', event => {
    if (event.item.displayName.getString() == '[Chest Creator - Common]') {
        const position = event.target.block;
        if (position != null) { } if (position != null) {
            const { level, player } = event;
            createChest(level, player, position, Rarity.COMMON);
        }
    }
});

ItemEvents.rightClicked('minecraft:stone_pickaxe', event => {
    if (event.item.displayName.getString() == '[Chest Creator - Uncommon]') {
        const position = event.target.block;
        if (position != null) {
            const { level, player } = event;
            createChest(level, player, position, Rarity.UNCOMMON);
        }
    }
});

ItemEvents.rightClicked('minecraft:iron_pickaxe', event => {
    if (event.item.displayName.getString() == '[Chest Creator - Rare]') {
        const position = event.target.block;
        if (position != null) {
            const { level, player } = event;
            createChest(level, player, position, Rarity.RARE);
        }
    }
});

ItemEvents.rightClicked('minecraft:yellow_pickaxe', event => {
    if (event.item.displayName.getString() == '[Chest Creator - Epic]') {
        const position = event.target.block;
        if (position != null) {
            const { level, player } = event;
            createChest(level, player, position, Rarity.EPIC);
        }
    }
});

ItemEvents.rightClicked('minecraft:diamond_pickaxe', event => {
    if (event.item.displayName.getString() == '[Chest Creator - Legendary]') {
        const position = event.target.block;
        if (position != null) {
            const { level, player } = event;
            createChest(level, player, position, Rarity.LEGENDARY);
        }
    }
});

ItemEvents.rightClicked('minecraft:stick', event => {
    if (event.item.displayName.getString() == '[Chest Remover]') {
        const position = event.target.block;
        if (position != null) {
            const { level, player } = event;
            removeChest(level, player, position);
        }
    }
});

ItemEvents.rightClicked('minecraft:paper', event => {
    if (event.item.displayName.getString() == '[List Chests]') {
        event.player.tell(event.level.persistentData.get('chest_locations'));
    }
});