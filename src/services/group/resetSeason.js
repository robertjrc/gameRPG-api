class GroupResetSeason {
    execute(_group) {
        function setNextSeason() {
            const date = new Date()

            date.setMonth(date.getMonth() + 1, 1)
            date.setHours(0, 0, 0, 0)

            return date.getTime()
        }

        function coinLimitVerify(playerCurrentCoins, newCoins) {
            playerCurrentCoins += newCoins
            if (playerCurrentCoins > 999999) playerCurrentCoins = 999999

            return playerCurrentCoins
        }

        _group.players.sort((x, y) => {
            return x.scoreSeason - y.scoreSeason
        }).reverse()

        let endSeasonInfo = {
            season: _group.currentSeason.season,
            playerName: "",
            playerScore: 0,
            coins: 1,
            diamonds: 1,
            keys: 1
        }

        let topPlayer = _group.players[0]

        endSeasonInfo.playerName = topPlayer.name
        endSeasonInfo.playerScore = topPlayer.scoreSeason
        endSeasonInfo.coins = Math.floor(topPlayer.scoreSeason * 0.3)
        endSeasonInfo.diamonds = Math.floor((topPlayer.scoreSeason * 0.3) / 50)
        endSeasonInfo.keys = Math.floor((topPlayer.scoreSeason * 0.3) / 500)

        topPlayer.coins = coinLimitVerify(topPlayer.coins, endSeasonInfo.coins)
        topPlayer.diamonds += endSeasonInfo.diamonds
        topPlayer.keys += endSeasonInfo.keys

        const newSeason = {
            season: _group.currentSeason.season,
            player: {
                serialized: topPlayer.serialized,
                name: topPlayer.name,
                scoreSeason: topPlayer.scoreSeason
            },
            createdAt: _group.currentSeason.createdAt
        }

        _group.nextSeason = setNextSeason()
        _group.seasons.push(newSeason)
        _group.currentSeason.season += 1
        _group.currentSeason.createdAt = Date.now()

        for (let player of _group.players) {
            player.scoreSeason = 0
        }

        return endSeasonInfo
    }
}

module.exports = { GroupResetSeason }
