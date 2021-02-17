import { MessageEmbed } from "discord.js"

export const helpMessage = `
Jestem botem do losowania drużyn ✌
👉 Jeśli nie ustawiłeś kanału z którego mam losować członków ustaw go przy pomocy komendy 👇
\`\`\` rand set nazwaKanału \`\`\`
👉 Sprawdź nazwę kanału z którego są losowane zespoły 👇
\`\`\` rand channel \`\`\`
👉 Jeśli chcesz wylosować kilka zespółów wpisz 👇
\`\`\` rand team ilośćZespołów  \`\`\`
`

export const numbersEmojiArray = ["1️⃣", "2️⃣", "3️⃣", "4️⃣"]

export const colors = {
    red: 0xff0000,
    green: 0x00ff00,
    blue: 0x0000ff,
    gold: 0xffd700,
}

export const sendMessage = (message, text, color = colors.blue) => {
    const embed = new MessageEmbed().setColor(color).setDescription(text)
    message.channel.send(embed)
}

export const printTeams = (teams, message) => {
    teams.forEach((team, number) => {
        let party = ""
        team.forEach((member, index) => {
            party += `\t ${numbersEmojiArray[index]} ${member} \n`
        })
        const embed = new MessageEmbed()
            .setColor(colors.gold)
            .setTitle(`Drużyna ${number + 1}`)
            .setDescription(party)
        message.channel.send(embed)
    })
}
