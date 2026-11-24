class PlayerGetRank {
    execute(score) {
        const ranks = [
            { name: "𝐁𝐫𝐨𝐧𝐳𝐞", icon: "🥉", minScore: 0, maxScore: 2456, tiers: 5 },
            { name: "𝐏𝐫𝐚𝐭𝐚", icon: "🥈", minScore: 2457, maxScore: 6148, tiers: 5 },
            { name: "𝐎𝐮𝐫𝐨", icon: "🥇", minScore: 6149, maxScore: 11683, tiers: 5 },
            { name: "𝐌𝐞𝐬𝐭𝐫𝐞", icon: "🏅", minScore: 11684, maxScore: 19983, tiers: 1 },
            { name: "𝐋𝐞𝐧𝐝𝐚", icon: "🎖️", minScore: 19984, maxScore: Infinity, tiers: 1 }
        ]

        const divisions = ["𝐈", "𝐈𝐈", "𝐈𝐈𝐈", "𝐈𝐕", "𝐕"]

        for (let rank of ranks) {
            if (score >= rank.minScore && score <= rank.maxScore) {
                if (rank.name === "𝐌𝐞𝐬𝐭𝐫𝐞" || rank.name === "𝐋𝐞𝐧𝐝𝐚") {
                    return `${rank.icon}   *${rank.name}*`;
                }

                const scorePerTier = (rank.maxScore - rank.minScore + 1) / rank.tiers;
                const tierLevel = Math.min(
                    rank.tiers,
                    Math.ceil((score - rank.minScore + 1) / scorePerTier)
                );

                const tier = divisions[(rank.tiers - tierLevel + 1) - 1]

                return `${rank.icon}   *${rank.name} ${tier}*`;
            }
        }
    }
}

module.exports = { PlayerGetRank }
