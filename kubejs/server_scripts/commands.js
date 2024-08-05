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
        .then(Commands.literal(`join`).requires(source => source.hasPermission(0))
            .executes(c => joinLobby(c.source.player, c.source.server))
        )
        .then(Commands.literal(`leave`).requires(source => source.hasPermission(0))
        .executes(c => leaveLobby(c.source.player, c.source.server))
        )
        .then(Commands.literal(`stop`).requires(source => source.hasPermission(2))

        )
        .then(Commands.literal(`start`).requires(source => source.hasPermission(2))
            .executes(c => startGame(c.source.server, c.source.level))
        )
    )

    event.register(Commands.literal("survivalgames")
        .requires(s => s.hasPermission(2))
        .then(Commands.literal(`chests`).requires(source => source.hasPermission(2))
            .executes(c => createChestMakingTools(c.source.player))
        )
        .then(Commands.literal(`join`).requires(source => source.hasPermission(0))

        )
        .then(Commands.literal(`leave`).requires(source => source.hasPermission(0))

        )
        .then(Commands.literal(`stop`).requires(source => source.hasPermission(2))

        )

    )
})