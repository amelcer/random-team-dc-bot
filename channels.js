export const getVoiceChannels = (message) => {
    return [...message.guild.channels.cache.filter((ch) => ch.type === "voice").values()]
}

export const getGuildMemberFromChannel = (channel) => {
    return channel.members.map((member) => member)
}

export const getVoiceChannelFromMessageAuthor = ({ member }) => {
    return member.voice.channel
}
