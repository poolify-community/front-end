import { Box, Flex, Heading, Text,Button,Image, Link,useBreakpointValue,chakra } from '@chakra-ui/react';
import Card from 'components/Card/Card';


const styles = {
    statCard:{
        'background': 'rgb(253, 254, 255)',
        'box-shadow': 'rgb(218 206 230 / 25%) 0px 0px 27px 5px'
    }
}

const Statistics = () => {
    const isOneLineMode = useBreakpointValue({ base: false, xl: true });

    return (
        <Flex maxWidth={'800px'} flexDirection={'column'} textAlign={'left'}
                alignContent={'flex-start'} alignItems={'flex-start'}
        >
            <Heading size={'md'} color={'poolify.400'} fontWeight={'bold'}> Poolify Finance</Heading>
            <Heading>
                Optimize your investment and select the best strategy that apply to you.
            </Heading>
            <Text>
                Poolify finance is a platform that combine the best strategy available on the market that were battle tested by famous protocols like 
                <chakra.Span fontWeight='800'> Beefy </chakra.Span> or <chakra.Span fontWeight='800'>Alpaca Finance</chakra.Span>.
            </Text>
        </Flex>
    );
};

export default Statistics;
