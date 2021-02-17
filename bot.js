import { Client, Collection } from "discord.js"
import dotenv from "dotenv"
import fs from "fs"
import { PREFIX } from "./constant"
import { colors, sendMessage } from "./messages"
dotenv.config()
const client = new Client()

client.commands = new Collection()

const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.on("ready", () => {
    console.log("READY TO GO")
})

client.on("message", (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot || !message.guild) return

    const args = message.content.slice(PREFIX.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    if (!client.commands.has(command)) {
        sendMessage(message, `Nie znam takiego polecenia`, colors.red)
        return
    }

    try {
        client.commands.get(command).execute(message, args)
    } catch (error) {
        console.error(error)
        sendMessage(message, `Coś jest nie tak z tym poleceniem...`, colors.red)
    }
})

client.login(process.env.TOKEN)
