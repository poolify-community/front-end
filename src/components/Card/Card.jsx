import { Box, chakra, useColorMode,useColorModeValue } from '@chakra-ui/react';

// TODO: Add a proper boxShadowValue when in hover state.
const Card = chakra((props) => {
    const { children, variant, ...rest } = props;

    const themeColor = {
        base: {
            bg: useColorModeValue('white', '#34294A'),
            boxShadow: useColorModeValue('base', 'undefined'),
        },
        light: {
            bg: useColorModeValue('white', 'tertiary.700'),
            boxShadow: useColorModeValue('base', 'undefined'),
        },
        deep: {
            bg: useColorModeValue('#FFFFFFBF', '#18102D9E'),
            boxShadow: useColorModeValue('base', 'undefined'),
        },
        deep2: {
            bg: useColorModeValue('white', '#211834'),
            boxShadow: useColorModeValue('base', 'undefined'),
        },
        grey: {
            bg: useColorModeValue('#F5F5F5', 'tertiary.700'),
            boxShadow: useColorModeValue('undefined', 'undefined'),
        },
        gray: {
            bg: useColorModeValue('#F8F6FF', '#292343'),
            boxShadow: useColorModeValue('undefined', 'undefined'),
        },
        purpleLinear: {
            bg: useColorModeValue(
                'linear-gradient(180deg, #EAEAF9 15.85%, rgba(242, 242, 244, 0.72) 80.99%)',
                'linear-gradient(98.73deg, rgba(69, 54, 100, 0.26) -2.37%, #6C5F88 39.25%, rgba(40, 13, 98, 0.18) 115.14%)'
            ),
            boxShadow: useColorModeValue('undefined', 'undefined'),
        },
        none: {
            bg: 'undefined',
            boxShadow: 'undefined',
        },
    };

    return (
        <Box
            bg={
                variant
                    ? themeColor[variant].bg
                    : themeColor['base'].bg
            }
            boxShadow={
                variant
                    ? themeColor[variant].boxShadow
                    : themeColor['base'].boxShadow
            }
            borderRadius="6px"
            {...rest}
        >
            {children}
        </Box>
    );
});

export default Card;
