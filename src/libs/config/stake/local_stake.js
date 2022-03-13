import { govPoolABI } from '../abi';

const moonpot = {
  logo: 'stake/moonpot/logo.png',
  background: 'stake/moonpot/bg.png',
  text: 'Moonpot is a win-win savings game on Binance Smart Chain powered by Beefy Finance. By depositing crypto into a Moonpot, users gain interest on their assets and enter into a prize draw at the same time. There’s a chance to win weekly prizes paid out in crypto from each Moonpot entered — as well as an exclusive monthly prize draw for $POTS stakers.',
  website: 'https://moonpot.com/',
  social: {
    telegram: 'https://t.me/moonpotdotcom',
    twitter: 'https://twitter.com/moonpotdotcom',
  },
};
const ceek = {
  logo: 'stake/ceek/logo.png',
  background: 'stake/ceek/bg.png',
  text: 'CEEK (CEEK) is a decentralized platform featuring global superstars like Lady Gaga, Katy Perry, Ziggy Marley, Bon Jovi, UFC Champion Francis Ngannou, 3x NBA Champion Dwyane Wade and more. CEEK enables music artists, sports athletes and digital content creators to directly connect with their fans. CEEK tracks digital media assets on the blockchain, and makes fast, efficient secure payments for entertainment and education via smart contracts.',
  website: 'https://www.ceek.io/',
  social: {
    telegram: 'https://t.me/ceekvrtokensale',
    twitter: 'https://twitter.com/ceek',
  },
};
const nfty = {
  logo: 'stake/nfty/logo.png',
  background: 'stake/nfty/bg.png',
  text: 'NFTYLabs envisions a world where NFTs function as a medium of access, bringing a means of utility and privilege to NFT holders in a secure and confidential manner. NFTY will act as a cross-chain and interoperable bridge between enterprise, private content, and VIP communities; further strengthening the bond in ways never before imagined.',
  website: 'https://nftynetwork.io/',
  social: {
    telegram: 'https://t.me/NFTYNetwork',
    twitter: 'https://twitter.com/NFTYNetwork',
  },
};
const mogul = {
  logo: 'stake/mogul/logo.png',
  background: 'stake/mogul/bg.png',
  text: 'Mogul is an NFT and DeFi platform for film and entertainment, bridging Hollywood and blockchain technology. The STARS token powers the Mogul platform and offers rewards from movies. The Mogul platform has an NFT auction house, marketplace, and other products in the metaverse to bring movie fans closer to the action.',
  website: 'https://www.mogulproductions.com/',
  social: {
    telegram: 'https://t.me/mogulproductions',
    twitter: 'https://twitter.com/mogulofficial_',
  },
};

export const localStakePools = [
  {
    id: 'bifi-bnb',
    name: 'BIFI',
    logo: 'single-assets/BIFI.png',
    token: 'BIFI',
    tokenDecimals: 18,
    tokenAddress: '0xCa3F508B8e4Dd382eE878A314789373D80A5190A',
    tokenOracle: 'tokens',
    tokenOracleId: 'BIFI',
    earnedToken: 'BNB',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    earnContractAddress: '0x453D4Ba9a2D594314DF88564248497F7D74d6b2C',
    earnContractAbi: govPoolABI,
    earnedOracle: 'tokens',
    earnedOracleId: 'WBNB',
    partnership: false,
    status: 'active',
    fixedStatus: true,
    partners: [
      {
        logo: 'stake/beefy/beefyfinance.png',
        logoNight: 'stake/beefy/beefyfinance_night.png',
        background: 'stake/beefy/background.png',
        text: "Beefy Finance is The Multi-Chain Yield Optimizer across many blockchains, enabling users to earn autocompounded yield on their crypto. Did you know also that you can own a piece of Beefy itself? Beefy runs on its governance token, BIFI. The token has a set supply of 80,000 across all chains; no more may be minted, ever! As a holder of BIFI you may create and vote on important DAO proposals, and you become dividend-eligible to earn a share of every compounding harvest on Beefy vaults, hour by hour. Here on Binance, you just need to stake BIFI in this reward pool, or in the autocompounding BIFI Maxi vault on the main page. For this pool, BNB dividends are gathered and sent proportionally to each staker. Stake here, return later to claim the BNB you've earned.",
        website: 'https://app.beefy.finance',
        social: {
          telegram: 'http://t.me/beefyfinance',
          twitter: 'https://twitter.com/beefyfinance',
        },
      },
    ],
  },

  {
    id: 'moo_cakev2-cake-bnb-dibs',
    name: 'DibsMoney',
    assets: ['CAKE', 'BNB'],
    token: 'mooCakeV2CAKE-BNB',
    tokenDecimals: 18,
    tokenAddress: '0xb26642B6690E4c4c9A6dAd6115ac149c700C7dfE',
    tokenOracle: 'lps',
    tokenOracleId: 'cakev2-cake-bnb',
    earnedToken: 'DSHARE',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0x26d3163b165BE95137CEe97241E716b2791a7572',
    earnContractAddress: '0x5e0D12A2AD1E74afB435F8EF2750Ed5885a08FEB',
    earnContractAbi: govPoolABI,
    earnedOracle: 'tokens',
    earnedOracleId: 'DSHARE',
    partnership: true,
    status: 'active',
    isMooStaked: true,
    periodFinish: 1643188921,
    partners: [
      {
        logo: 'stake/dibs/logo.png',
        background: 'stake/dibs/bg.png',
        text:
          'DibsMoney - not just another Tomb fork! dibs.money is a multi-token DeFi protocol pegged to the price of BNB, and with multiple use cases that will drive demand in the short term pipeline, as an example a launch partnership with one of the largest NFT-platforms on the Binance smart chain. \n' +
          '\n' +
          "$DIBS is a unique token in that it tracks the price of BNB, all while earning super high APY's. $DSHARE on the other hand is your ticket to earn the freshly minted $DIBS from the dibs.money Piggybank. Whether you're bullish on BNB or on Dshare - dibs.money has an option for you.\n",
        website: 'https://www.dibs.money/farm',
        social: {
          telegram: 'https://t.me/dibsmoney',
          twitter: 'https://twitter.com/DibsMoney',
        },
      },
    ],
  }
]