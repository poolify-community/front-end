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
                    fontFamily: 'SF Pro Text',
                    fontSize: '16px',
                    lineHeight: '24px',
                };
            case 'caption-slim':
                return {
                    fontFamily: 'SF Pro Text',
                    fontSize: '12px',
                    lineHeight: '15px',
                    fontWeight: '500',
                };
            case 'caption':
                return {
                    fontFamily: 'SF Pro Text',
                    fontSize: '12px',
                    lineHeight: '15px',
                };
            case 'caption-bold':
                return {
                    fontFamily: 'SF Pro Text SemiBold',
                    fontSize: '12px',
                    lineHeight: '15px',
                };
        }
    }, [variant]);
    return (
        <Box
            as="span"
            fontSize={style.fontSize}
            fontFamily={style.fontFamily}
            lineHeight={style.lineHeight}
            {...chakraProps}
        />
    );
});
