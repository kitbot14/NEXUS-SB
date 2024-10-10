const Discord = require("discord.js");

const config = require("../../config.json");

module.exports = {

    name: "panel",

    description: "Cette commande est réservée aux ADMINISTRATEURS",

    permissions: "ADMINISTRATOR", // Permission administrateur

    async run(bot, interaction) {

        // Vérifier si l'utilisateur a la permission "Administrateur"

        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {

            return interaction.reply({ content: "Vous n'avez pas la permission d'utiliser cette commande.", ephemeral: true });

        }

        // Fonction pour créer l'embed

        function createEmbed() {

            return new Discord.EmbedBuilder()

                .setTitle("Pour vous connecter à Kit | Prv :")

                .setDescription("Bienvenue sur le panel de connexion de KIT | PRV. Afin de vous connecter, interagissez avec le bouton ci-dessous.\n\nCliquez sur le bouton pour commencer la procédure de connexion. Si vous rencontrez des difficultés, veuillez contacter un administrateur.")

                .setFooter({ text: "KIT | PRV | CONNECTION", iconURL: "https://i.ibb.co/g6bkrWp/static.png" })

                .setColor("#6A0DAD"); // Couleur violette

        }

        // Création du bouton de connexion

        const button = new Discord.ButtonBuilder()

            .setCustomId("connect_button") // ID personnalisé pour reconnaître l'interaction du bouton

            .setLabel("Se connecter")

            .setStyle(Discord.ButtonStyle.Primary)

            .setEmoji('⚡'); // Optionnel : icône clé

        // Créer une ligne d'action pour contenir le bouton

        const row = new Discord.ActionRowBuilder()

            .addComponents(button);

        // Stocke le message actuellement envoyé pour pouvoir le supprimer plus tard

        let currentMessage;

        // Fonction pour envoyer le panel et supprimer l'ancien

        async function sendPanel() {

            try {

                // Supprimer l'ancien message s'il existe

                if (currentMessage) {

                    await currentMessage.delete().catch(err => console.error("Erreur lors de la suppression de l'ancien message:", err));

                }

                // Envoyer le nouvel embed avec le bouton

                currentMessage = await interaction.channel.send({ embeds: [createEmbed()], components: [row] });

            } catch (err) {

                console.error("Erreur lors de l'envoi du panel:", err);

            }

        }

        // Envoi initial de l'embed avec le bouton

        currentMessage = await interaction.reply({ embeds: [createEmbed()], components: [row], fetchReply: true });

        // Définir un intervalle pour renvoyer le formulaire toutes les 5 minutes (300000 ms)

        setInterval(sendPanel, 300000); // 5 minutes = 300000 ms

    }

};
