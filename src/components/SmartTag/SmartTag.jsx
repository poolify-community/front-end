import {chakra,useStyleConfig } from '@chakra-ui/react';

// TODO: Add a proper boxShadowValue when in hover state.
const SmartTag = chakra((props) => {
    const { size,children, variant, ...rest } = props;
    return (
        <chakra.span sx={useStyleConfig('SmartTag', { size, variant })}>
            {children}
        </chakra.span>
        
    );
});

export default SmartTag;
