import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder().setName('test').setDescription('very cool test command'),
    async execute(interaction) {
        await interaction.reply('very cool, works or something');
    }
};
