import { Box, Flex, Stack } from '@chakra-ui/react';
import { Heading, Text } from '../Typography/Typography';
import PropTypes from "prop-types";

const Header = (props) => {
    return (
        <Flex p="30px 0 24px" direction="row" w="100%">
            <Stack flexGrow={1}>
                {typeof props.title === 'string' ? (
                    <Heading level="3">{props.title}</Heading>
                ) : (
                    props.title
                )}
                <Text variant="display">{props.subtitle}</Text>
            </Stack>
            {props.element && <Box flexShrink={0}>{props.element}</Box>}
        </Flex>
    )
};

export default Header;

Header.propTypes = {
    title: PropTypes.object,
    subtitle: PropTypes.string,
    element: PropTypes.object,
    variant: PropTypes.string
};
