import { Box, Flex, Heading, Text,Button,Image, Link,useBreakpointValue,chakra } from '@chakra-ui/react';
import Card from 'components/Card/Card';


const Statistics = () => {
    const isOneLineMode = useBreakpointValue({ base: false, xl: true });

    return (
        <Flex maxWidth={'800px'} flexDirection={'column'} textAlign={'left'}
                alignContent={'flex-start'} alignItems={'flex-start'} color={'white'}
        >
            <Heading size={'md'} fontWeight={'bold'}> Poolify Finance</Heading>
            <Heading color={'white'} size={'lg'} mt={'4px'}>
                    Optimize your investment and select the best strategy that apply to you.
            </Heading>
            {/* 
            <Text>
                Poolify finance is a platform that combine the best strategy available on the market that were battle tested by famous protocols like 
                <chakra.Span fontWeight='800'> Beefy </chakra.Span> or <chakra.Span fontWeight='800'>Alpaca Finance</chakra.Span>.
            </Text>
            */}
        </Flex>
    );
};

export default Statistics;
