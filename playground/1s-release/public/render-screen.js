export default function renderScreen(screen, scoreTable, game, requestAnimationFrame, currentPlayerId) {
    const context = screen.getContext('2d')
    context.fillStyle = 'white'
    context.clearRect(0, 0, 25, 25)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = 'white'
        context.fillRect(player.x, player.y, 1, 1)
    }

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    const currentPlayer = game.state.players[currentPlayerId]

    if(currentPlayer) {
        context.fillStyle = '#F0DB4F'
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
        updateScoreTable(scoreTable, game, currentPlayerId)
    }


    requestAnimationFrame(() => {
        renderScreen(screen, scoreTable, game, requestAnimationFrame, currentPlayerId)
    })
}

function updateScoreTable(scoreTable, game, currentPlayerId) {
    let scoreTableHtml = `
    <h2>Tabela de pontuação</h2>
    <table>
        <tr>
            <th>Jogador</th>
            <th>Pontos</th>
        </tr>
    `

    for(const playerId in game.state.players) {
        const player = game.state.players[playerId]
        let playerTd = ''

        if (playerId === currentPlayerId) {
            playerTd = `
            <tr id="current-player-row">
                <td class="player-id current-player-id">${playerId}</td>
                <td class="player-score current-player-score">${player.score}</td>
            </tr>`
        } else {
            playerTd = `
            <tr>
            <td class="player-id">${playerId}</td>
            <td class="player-score">${player.score}</td>
            </tr>`
        }
        scoreTableHtml += playerTd
    }

    scoreTable.innerHTML = scoreTableHtml


}