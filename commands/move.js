import { moveTeams } from "../team"

export const name = "move"
export const description = "Przenosi drużyny do kanałów głosowych"
export function execute(message) {
    moveTeams(message)
}
