import { sendMessage, helpMessage } from "../messages"

export const name = "help"
export const description = "Wzywa pomoc"
export function execute(message) {
    sendMessage(message, helpMessage)
}
