ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event

    event.register(Commands.literal("sg")
        .requires(s => s.hasPermission(2))
        .then(Commands.literal(`chests`).requires(source => source.hasPermission(2))
            .then(Commands.literal('create').executes(c => createChestMakingTools(c.source.player)))
            .then(Commands.literal('highlight')
                .then(Commands.argument('bool', Arguments.BOOLEAN.create(event))
                    .executes(c => highlightEveryChest(c.source.level, Arguments.BOOLEAN.getResult(c, 'bool')))
                )
            )
        )
        .then(Commands.literal(`spawn`).requires(source => source.hasPermission(2))
            .then(Commands.literal('add').executes(c => createPlayerSpawn(c.source.server.persistentData, c.source.player.block.pos)))
            .then(Commands.literal('remove').executes(c => removePlayerSpawn(c.source.server.persistentData, c.source.player.block.pos)))
        )
        .then(Commands.literal(`queue`).requires(source => source.hasPermission(0))
            .executes(c => joinQueue(c.source.server, c.source.player))
        )
        .then(Commands.literal(`unqueue`).requires(source => source.hasPermission(0))
            .executes(c => leaveQueue(c.source.server, c.source.player))
        )
        .then(Commands.literal(`vote`).requires(source => source.hasPermission(0))
            .executes(c => playerVote(c.source.server, c.source.player))
        )
        .then(Commands.literal(`unvote`).requires(source => source.hasPermission(0))
            .executes(c => playerUnvote(c.source.server, c.source.player))
        )
        .then(Commands.literal(`leave`).requires(source => source.hasPermission(0))
            .executes(c => leaveGame(c.source.server, c.source.player, true))
        )
        .then(Commands.literal(`stop`).requires(source => source.hasPermission(2))
        .executes(c => stopGame(c.source.server, c.source.level))
        )
        .then(Commands.literal(`start`).requires(source => source.hasPermission(2))
            .executes(c => startGame(c.source.server, c.source.level))
        )
    )
})