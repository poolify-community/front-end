import {
    Text,
    Button,
    Flex,
    Heading,
    Spacer
} from "@chakra-ui/react";
import Card from 'components/Card/Card';
import {getIconElement,getLPElement} from 'libs/helpers/tokens';

export default function({bounty,props}){
    return (
        <Card>
            <Flex flexDirection={'column'} maxHeight={'90vh'} overflowY={'auto'} padding={'24px'} >
                <Flex flexDirection={'column'} maxHeight={'90vh'} overflowY={'auto'}>
                    <Flex justifyContent={'space-between'}>
                        <Heading size={'md'} color={'gray.600'}> Auto PLFY Bounty</Heading>
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'space-between'} marginBottom={'8px'} marginTop={'30px'}>
                        <Spacer/>
                        <Flex alignItems={'center'}>
                            <Text paddingRight={'5px'}>
                                {bounty}
                            </Text>
                            {getIconElement({tokenA:'POOLIFY'})}
                        </Flex>
                    </Flex>
                    <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} mt={'5px'}>
                        <Button colorScheme='blue' size='lg' height='40px' w={'100px'}>
                            Claim 
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}
