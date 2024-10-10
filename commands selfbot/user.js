const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "users",
    description: "Affiche le nombre d'utilisateurs",
    permissions: "Aucune",

    async run(bot, interaction) {
        // Chemin vers le fichier config.json
        const configPath = './config.json';

        // Lecture du fichier config.json
        let configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

        // Récupération des utilisateurs de la configuration
        const users = configData.user || {};
        const userIds = Object.keys(users);

        // Initialisation des champs pour l'embed
        let userFields = [];

        // Construction des champs avec les informations des utilisateurs (ID et pseudo)
        userIds.forEach((id) => {
            const user = users[id];
            userFields.push({
                name: `ID: ${id}`,
                value: `Pseudo: ${bot.users.cache.get(id)?.username || 'Inconnu'}`
            });
        });

        // Création de l'embed pour afficher les informations des utilisateurs
        const embed = new Discord.EmbedBuilder()
            .setColor("Purple")
            .setTitle('Informations des utilisateurs')
            .setDescription(`Nombre total d'utilisateurs : ${userIds.length}`)
            .addFields(userFields);

        // Envoi de l'embed en réponse à la commande
        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
