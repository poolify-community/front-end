
import chainId from 'libs/helpers/chains';
import tokens,{TokenSymbol} from 'config/tokens';

export const vaultConfigList = {
    [chainId.LocalHost]:[
        {
            name:'Maxi POOLIFY',
            tokenA:TokenSymbol.POOLIFY,
            tokenB:null,
            tokenReward: TokenSymbol.POOLIFY,
            tokenVault: TokenSymbol.POOLIFY,
            vaultContract:'0x73914Bcc8F2c6A0fb2f4DC463eAFAe47c9D13D7B',
            strategy:null,
            fee1:'Unstaking fee 1% (if withdrawn within 24h)',
            fee2:'Performance Fee 2%',
            assets: ['POOLIFY'],
            token: 'POOLIFY',
            tokenDecimals: 18,
            tokenAddress: '0xD5295b00788F79723202f3CeA2e6933F822a6da7',
        },
        {
            name:'Liquidity Mining',
            tokenA:TokenSymbol.POOLIFY,
            tokenB:TokenSymbol.BNB,
            tokenReward: TokenSymbol.POOLIFY,
            tokenVault: `${TokenSymbol.POOLIFY}-${TokenSymbol.BNB}`,
            vaultContract:'0x73914Bcc8F2c6A0fb2f4DC463eAFAe47c9D13D7B',
            strategy:'Pancake Strat v1',
            fee1:'Unstaking fee 1% (if withdrawn within 24h)',
            fee2:'Performance Fee 2%',
            assets: ['POOLIFY'],
            token: 'POOLIFY',
            tokenDecimals: 18,
            tokenAddress: '0xD5295b00788F79723202f3CeA2e6933F822a6da7'
        },
    ]
} 