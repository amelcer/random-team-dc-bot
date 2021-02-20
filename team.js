import { colors, printTeams, sendMessage } from "./messages"
import { getRandomIndexes } from "./randomizer"

export const getTeams = (message, teamsAmmount) => {
    const channel = message.member.voice.channel
    if (!channel) {
        sendMessage(message, `Dołącz do kanału z którego mam losować`, colors.red)
        return
    }

    const users = getUsers(channel)

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
    let teams = []
    teamsSchedule.forEach((ts) => {
        const randomIndexes = getRandomIndexes(ts, users.length, drawnIndexes)
        const team = randomIndexes.map((ind) => users[ind])
        teams = [...teams, team]
    })

    printTeams(teams, message)
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

const getUsers = ({ members }) => {
    return members.map(({ user }) => user.username)
}
