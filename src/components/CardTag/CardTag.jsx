import {chakra,useStyleConfig,Tag } from '@chakra-ui/react';

const CardTag = chakra((props) => {
    const { size,children, variant, text, icon, ...rest } = props;
    return (
        <Tag sx={useStyleConfig('CardTag', { size, variant })} {...rest}>
                {text}
        </Tag>
    );
});

export default CardTag;
