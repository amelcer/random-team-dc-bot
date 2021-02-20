import { isInt } from "../helpers"
import { colors, sendMessage } from "../messages"
import { getTeams } from "../team"

export const name = "team"
export const description = "Losuje drużyny"
export function execute(message, args) {
    if (args.length === 0 || !isInt(args[0])) {
        sendMessage(message, "Nie podano liczby zespołów", colors.red)
        return
    }
    getTeams(message, args)
}
