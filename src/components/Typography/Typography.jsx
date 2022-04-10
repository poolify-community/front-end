import { Box, chakra } from '@chakra-ui/react';
import React, { useMemo } from 'react';



export const Heading = chakra(
    ({ level, children, ...chakraProps }) =>
        React.createElement(`h${level}`, chakraProps, children)
);


export const Text = chakra(({ variant, ...chakraProps }) => {
    const style = useMemo(() => {
        switch (variant) {
            case 'display':
                return {
                    fontSize: '16px',
                    lineHeight: '24px',
                };
            case 'caption-slim':
                return {
                    fontSize: '12px',
                    lineHeight: '15px',
                    fontWeight: '500',
                };
            case 'caption':
                return {
                    fontSize: '12px',
                    lineHeight: '15px',
                };
            case 'caption-bold':
                return {
                    fontSize: '12px',
                    lineHeight: '15px',
                };
        }
    }, [variant]);
    return (
        <Box
            as="span"
            fontSize={style.fontSize}
            lineHeight={style.lineHeight}
            {...chakraProps}
        />
    );
});
