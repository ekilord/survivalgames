const CONSTANTS = {
    config_path: 'survival_games/config.json',
    default_config: {
        min_players: 1,
        countdown_length: 30,
    },
}

const Rarity = {
    COMMON: { rarity: 'common', color: 'gray', block: 'minecraft:gray_concrete' },
    UNCOMMON: { rarity: 'uncommon', color: 'green', block: 'minecraft:lime_concrete' },
    RARE: { rarity: 'rare', color: 'blue', block: 'minecraft:light_blue_concrete' },
    EPIC: { rarity: 'epic', color: 'darkPurple', block: 'minecraft:purple_concrete' },
    LEGENDARY: { rarity: 'legendary', color: 'gold', block: 'minecraft:yellow_concrete' }
};

const PersistentData = {
    COUNTDOWN: 'sg_countdown',
    GAME_STATE: 'sg_game_state',
    QUEUED_PLAYERS: 'sg_queued_players',
    JOINED_PLAYERS: 'sg_joined_players',
    PLAYER_SPAWNS: 'sg_player_spawn_locations',
    CHEST_LOCATIONS: 'sg_chest_spawn_locations',
}

const GameState = {
    WAITING: 'waiting',
    STARTING: 'starting',
    INIT: 'init',
    STARTED: 'started',
}