import { HStack} from '@chakra-ui/react';


export default (props) => {
    const { children, ...rest } = props;

    return (
        <HStack
            px="0px"
            position="absolute"
            top="0"
            left="32px"
            transform="translateY(-50%)"
            w="100%"
            {...rest}
        >
            {children}
        </HStack>
    );
};
