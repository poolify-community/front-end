import {chakra,Box, Image } from '@chakra-ui/react';
import tokens from "config/tokens";

const sizeMapping = {
    sm: {box:'30px',left:'20px',right:'25px'},
    md: {box:'50px',left:'30px',right:'40px'},
}

export const DoubleTokenIcon = chakra(({tokenA,tokenB,size,...props}) => {
    const _size = sizeMapping.hasOwnProperty(size)? sizeMapping[size]:sizeMapping['md'];
    return (
        <Box
            key="CoinIcons"
            position="relative"
            w={_size.box}
            h={_size.box}
            flexShrink={0}
        >
            <Image
                position="absolute"
                top="0"
                left="0"
                borderRadius="13px"
                h={_size.left}
                w={_size.left}
                flexShrink={0}
                src={
                    process.env.PUBLIC_URL +
                    tokens[tokenB]?.icon
                }
            />

            <Image
                position="absolute"
                bottom="0"
                right="0"
                borderRadius="15px"
                h={_size.right}
                w={_size.right}
                flexShrink={0}
                src={
                    process.env.PUBLIC_URL +
                    tokens[tokenA]?.icon
                }
            />
        </Box>
    );
});

export default DoubleTokenIcon;

