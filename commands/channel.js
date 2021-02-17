import { getChannelName } from "../channel"
import { colors, sendMessage } from "../messages"

export const name = "channel"
export const description = "Pokazuje ustawiony kanał"
export async function execute(message) {
    const channelName = await getChannelName()
    if (!channelName) {
        sendMessage(
            message,
            'Obecnie brak ustawionego kanału \n Ustaw kanał przy pomocy komendy rand set "nazwa kanału"',
            colors.blue
        )
        return
    }
    sendMessage(message, `Obecnie ustawiony kanał do losowania to: ${channelName}`, colors.green)
}
