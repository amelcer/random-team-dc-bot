import { MessageEmbed } from "discord.js"

export const helpMessage = `
Jestem botem do losowania drużyn ✌
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
