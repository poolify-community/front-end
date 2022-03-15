import tokens,{TokenSymbol} from 'config/tokens';
export const bscTestNetPools = [
    {
        id: "poolify-maxi",
        logo: "assets/tokens/poolify.png",
        name: "POOLIFY Maxi",
        token: "PLFY",
        tokenDescription: "Poolify.Finance",
        tokenAddress: "0xCCa640c3AC0DaE0F66bDf25C3049992B82B7dE1c",
        tokenExplorer: "https://testnet.bscscan.com/address/0xCCa640c3AC0DaE0F66bDf25C3049992B82B7dE1c",
        tokenDecimals: 18,
        pricePerFullShare: 1,
        tvl: 0,
        oracle: "tokens",
        oracleId: "PLFY",
        oraclePrice: 0,
        depositsPaused: false,
        status: "active",
        platform: "Poolify.Finance",
        assets: [
            "PLFY"
        ],
        stratType: "SingleStake",
        withdrawalFee: "0.05%",
        buyTokenUrl: "https://app.1inch.io/#/56/swap/BNB/PLFY",
        createdAt: 1606511757,
        isPoolifyStaking: true,
        categories: [
            "core",
            "SingleAsset"
        ],
        vaultToken:"bucketPLFY",
        vaultTokenAddress: "0x95EAF0156C05df0fE83859e466ea8877090ac898",
        vaultContractAddress: "0x95EAF0156C05df0fE83859e466ea8877090ac898",
        vaultExplorer: "https://testnet.bscscan.com/address/0x95EAF0156C05df0fE83859e466ea8877090ac898",
        tokenA:TokenSymbol.POOLIFY,
        tokenB:null,//TokenSymbol.BNB,
  }
];