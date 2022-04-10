import {
    Box,
    Image,
    HStack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';


export const CustomTag = (props) => {
    const { variant, text, icon, ...rest } = props;

    const theme = {
        blue: {
            color: useColorModeValue('primary.600', 'primary.50'),
            bg: useColorModeValue('primary.100', '#3D4375'),
        },
        purple: {
            color: useColorModeValue('secondary.600', 'secondary.50'),
            bg: useColorModeValue('secondary.100', 'secondary.700'),
        },
        green: {
            color: useColorModeValue('#138842', 'primary.50'),
            bg: useColorModeValue('#DEF5E6', '#20442C'),
        },
        yellow: {
            color: useColorModeValue('#885406', 'primary.50'),
            bg: useColorModeValue('#FEFFE0', '#3C3D39'),
        },
        grey: {
            color: useColorModeValue('primary.500', 'primary.50'),
            bg: useColorModeValue('primary.100', '#2252CC'),
        },
    };

    return (
        <Box
            py="4px"
            px="32px"
            h="24px"
            borderRadius="3px"
            bg={theme[variant].bg}
            fontSize="12px"
            lineHeight="15px"
            fontWeight="600"
            {...rest}
        >
            <HStack>
                {icon && <Image src={process.env.PUBLIC_URL + icon} h="12px" />}
                <Text
                    className={''}
                    color={theme[variant].color}
                    isTruncated={true}
                >
                    {text}
                </Text>
            </HStack>
        </Box>
    );
};

