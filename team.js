import { getGuildMemberFromChannel, getVoiceChannelFromMessageAuthor, getVoiceChannels } from "./channels"
import { colors, printTeams, sendMessage } from "./messages"
import { getRandomIndexes } from "./randomizer"

let voiceChannels = []
let teams = []
let timeout
const timeToWait = 1000 * 60 * 5

export const getTeams = (message, teamsAmmount) => {
    clearTimeout(timeout)
    const channel = getVoiceChannelFromMessageAuthor(message)
    voiceChannels = getVoiceChannels(channel)

    if (!channel) {
        sendMessage(message, `Dołącz do kanału z którego mam losować`, colors.red)
        return
    }

    const users = getGuildMemberFromChannel(channel)

    if (users.length === 0) {
        sendMessage(message, `Brak użytkowników do losowania`, colors.red)
        return
    }

    if (users.length < teamsAmmount) {
        sendMessage(message, `Chcesz wylosować więcej drużyn niż jest graczy 🤦‍♂️`, colors.red)
        return
    }

    const teamsSchedule = teamBreakDown(users.length, teamsAmmount)
    const drawnIndexes = []
    teams = []
    teamsSchedule.forEach((ts) => {
        const randomIndexes = getRandomIndexes(ts, users.length, drawnIndexes)
        const team = randomIndexes.map((ind) => users[ind])
        teams = [...teams, team]
    })

    printTeams(teams, message)

    if (teams.length < voiceChannels.length) {
        sendMessage(
            message,
            "Przenieść zespoły do kanałów głosowych? 👉 Jeśli tak wpisz 👇 \n ``` rand move  ```",
            colors.blue
        )
        timeout = setTimeout(() => {
            voiceChannels = []
            teams = []
        }, timeToWait)
    }
}

const teamBreakDown = (members, teamsAmmount) => {
    let teams = []
    const recuriveBreakDown = (m, t) => {
        if (t === 0) {
            return
        }
        let teamNo = Math.floor(m / t)
        if (teamNo > 4) {
            teamNo = 4
        }
        teams = [...teams, teamNo]
        recuriveBreakDown(m - teamNo, t - 1)
    }
    recuriveBreakDown(members, teamsAmmount)
    return teams
}

export const moveTeams = (message) => {
    if (voiceChannels.length == 0 || teams.length == 0) {
        sendMessage(message, "Czas minął", colors.blue)
        return
    }

    teams.forEach((team, teamNumber) => {
        team.forEach((member) => {
            member.voice.setChannel(voiceChannels[teamNumber])
        })
    })
    teams = []
    voiceChannels = []
}
