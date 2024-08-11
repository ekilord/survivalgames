//   _____                                                _      
//  / ____|                                              | |     
// | |      ___   _ __ ___   _ __ ___    __ _  _ __    __| | ___ 
// | |     / _ \ | '_ ` _ \ | '_ ` _ \  / _` || '_ \  / _` |/ __|
// | |____| (_) || | | | | || | | | | || (_| || | | || (_| |\__ \
//  \_____|\___/ |_| |_| |_||_| |_| |_| \__,_||_| |_| \__,_||___/

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event

    event.register(Commands.literal("sg")
        .requires(s => s.hasPermission(2))
        .then(Commands.literal(`chests`).requires(source => source.hasPermission(2))
            .then(Commands.literal('create').executes(c => createChestMakingTools(c.source.player)))
            .then(Commands.literal('highlight')
                .then(Commands.argument('bool', Arguments.BOOLEAN.create(event))
                    .executes(c => toggleChestHighlights(c.source.level, Arguments.BOOLEAN.getResult(c, 'bool')))
                )
            )
        )
        .then(Commands.literal(`spawn`).requires(source => source.hasPermission(2))
            .then(Commands.literal('add').executes(c => createPlayerSpawn(c.source.player)))
            .then(Commands.literal('remove').executes(c => removePlayerSpawn(c.source.player)))
        )
        .then(Commands.literal(`queue`).requires(source => source.hasPermission(0))
            .executes(c => queue(c.source.player))
        )
        .then(Commands.literal(`unqueue`).requires(source => source.hasPermission(0))
            .executes(c => unqueue(c.source.player))
        )
        .then(Commands.literal(`vote`).requires(source => source.hasPermission(0))
            .executes(c => vote(c.source.player))
        )
        .then(Commands.literal(`unvote`).requires(source => source.hasPermission(0))
            .executes(c => unvote(c.source.player))
        )
        .then(Commands.literal(`leave`).requires(source => source.hasPermission(0))
            .executes(c => playerLeaveGame(c.source.player))
        )
        .then(Commands.literal(`stop`).requires(source => source.hasPermission(2))
            .executes(c => forceStopGame(c.source.level))
        )
        .then(Commands.literal(`start`).requires(source => source.hasPermission(2))
            .executes(c => startGame(c.source.level))
        )
    )
})