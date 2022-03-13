import tokens from 'config/tokens';

export const registerToken = async (tokenAddress, tokenSymbol, tokenDecimals) => {
    const tokenAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: `${window.location.origin}${tokens[tokenSymbol]?.icon}`,
        },
      },
    })
  
    return tokenAdded
}