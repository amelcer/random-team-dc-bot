import { colors, sendMessage } from "./messages"
import fs from "fs"

export const setChannel = (message, channelName) => {
    const srvChannel = message.guild.channels.cache.find(
        (ch) => ch.name.trim().toLowerCase() === channelName.trim().toLowerCase()
    )
    console.log(srvChannel)
    if (srvChannel) {
        const channel = srvChannel
        fs.writeFile("channel.txt", channel.name, function (_, __) {})
        sendMessage(message, `Nazwa kanału ustawiona na: ${channel.name}`, colors.green)
        return
    }
    sendMessage(message, `Nie znaleziono kanału: ${channelName}`, colors.red)
}

export const getChannelName = async () => {
    return await getChannelNameFromFile()
}

export const getChannel = async (message) => {
    const channelName = await getChannelNameFromFile()
    return message.guild.channels.cache.find((ch) => ch.name.trim().toLowerCase() === channelName.trim().toLowerCase())
}

const getChannelNameFromFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile("channel.txt", "utf8", function (err, data) {
            if (!err) {
                resolve(data)
            }
            reject(err)
        })
    })
}
