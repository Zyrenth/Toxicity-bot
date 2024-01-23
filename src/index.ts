import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';

import { Client, Collection, Events, GatewayIntentBits, REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

import { error, log, warn } from './Utilities/Logger.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

dotenv.config({ path: path.join(__dirname, '../.env') });

interface ExtendedClient extends Client {
    commands: Collection<string, any>;
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) as ExtendedClient;

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'Commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') && !fs.statSync(path.join(commandsPath, file)).isDirectory());

for (const file of commandFiles) {
    const command = (await import(path.join(commandsPath, file))).default;

    if ('data' in command && 'execute' in command) client.commands.set(command.data.name, command);
    else warn('[Commands]', `The ${file.split('.')[0]} command is missing required properties.`);
}

log('[Commands]', `Loaded ${client.commands.size} commands.`);

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = (interaction.client as ExtendedClient).commands.get(interaction.commandName);

    // To avoid type errors we return null && and the reply.
    if (!command) return null && interaction.reply({ content: `There is no such command as \`${interaction.command}\`.`, ephemeral: true });

    try {
        await command.execute(interaction);
    } catch (error) {
        log('[Commands]', `There was an error while executing the ${interaction.commandName} command:\n`, error);

        if (interaction.replied || interaction.deferred)
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        else await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.once(Events.ClientReady, async () => {
    const rest = new REST().setToken(process.env.TOKEN);
    const commands = client.commands.map(command => command.data.toJSON());

    try {
        log('[Routes]', `Started refreshing ${commands.length} application (/) commands.`);

        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );

        log('[Routes]', `Successfully reloaded ${commands.length} application (/) commands.`);
    } catch (err) {
        error('[Routes]', 'Failed to register the slash commands:\n', err);
    }
});

client.login(process.env.TOKEN);

export { __dirname };
