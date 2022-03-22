import { Tag,useColorModeValue } from '@chakra-ui/react';

export default (props) => {
    const { variant, text, icon, ...rest } = props;
    const theme = {
        blue: {
            color: useColorModeValue('blue.500', 'blue.50'),
            bg: useColorModeValue('blue.100', '#2252CC'),
        },
        purple: {
            color: useColorModeValue('secondary.500', 'secondary.50'),
            bg: useColorModeValue('secondary.100', 'secondary.400'),
        },
        orange: {
            color: 'orange.500',
            bg: 'orange.100',
        },
        grey: {
            color: useColorModeValue('primary.500', 'primary.50'),
            bg: useColorModeValue('primary.100', '#2252CC'),
        },
    };

    return (
        <Tag
            px="32px"
            // position="absolute"
            // top="0"
            // left="32px"
            // transform="translateY(-50%)"
            color={theme[variant].color}
            bg={theme[variant].bg}
            borderColor="#5F9EFF"
            border={useColorModeValue('1px', '0')}
            fontSize="12px"
            lineHeight="15px"
            fontWeight="600"
            fontFamily="Montserrat"
            {...rest}
        >
            {text}
        </Tag>
    );
};
