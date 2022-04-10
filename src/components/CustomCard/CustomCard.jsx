import { Box, chakra, useColorMode,useColorModeValue } from '@chakra-ui/react';

// TODO: Add a proper boxShadowValue when in hover state.

const CustomCard = chakra((props) => {
    const { children, variant,className,SmartTag, ...rest } = props;

    console.log('rest',rest,children,variant,);
    const _className = ['card',className].join(' ');
    return (
        <Box className={_className} position={'relative'} overflow={'hidden'}
            {...rest}
        >   
            {SmartTag && (
                SmartTag
            )}
            <Box className="card-body">
                {children}
            </Box>
            <Box className="card-arrow">
                <Box className="card-arrow-top-left"></Box>
                <Box className="card-arrow-top-right"></Box>
                <Box className="card-arrow-bottom-left"></Box>
                <Box className="card-arrow-bottom-right"></Box>
            </Box>
        </Box>
    );
});

export default CustomCard;
