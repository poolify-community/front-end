import { chakra,Box, Image } from '@chakra-ui/react';
import tokens from "config/tokens";

const sizeMapping = {
    sm: '20px',
    md: '30px',
    lg: '40px',
    xl: '50px',
    '2xl': '60px',
    '3xl': '60px',
    '4xl': '60px',
}

const SingleTokenIcon =  chakra(({tokenA,size,...props}) =>{
    const _size = sizeMapping.hasOwnProperty(size)? sizeMapping[size]:sizeMapping['lg'];
    return (
        <Box
            key="CoinIcons"
            position="relative"
            w={_size}
            h={_size}
            flexShrink={0}
            {...props}
        >
            <Image
                position="absolute"
                top="0"
                left="0"
                borderRadius="13px"
                h={_size}
                w={_size}
                flexShrink={0}
                src={process.env.PUBLIC_URL + tokens[tokenA]?.icon}
            />
        </Box>
    );
});

export default SingleTokenIcon;

