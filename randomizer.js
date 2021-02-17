export const getRandomIndexes = (amount, maxIndex, drawnIndexes) => {
    const uniqueIndexes = []
    let rand
    while (amount > 0) {
        rand = getRandomInt(0, maxIndex)
        if (!drawnIndexes.includes(rand)) {
            drawnIndexes.push(rand)
            uniqueIndexes.push(rand)
            amount--
        }
    }

    return uniqueIndexes
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}
