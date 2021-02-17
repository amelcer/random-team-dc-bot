import { setChannel } from "../channel"
import { sendMessage } from "../messages"

export const name = "set"
export const description = "Ustawia nazwę kanału z którego mają być losowani gracze"
export function execute(message, args) {
    if (args.length === 0) {
        sendMessage(message, "Podaj nazwę kanału")
        return
    }
    setChannel(message, args[0])
}
