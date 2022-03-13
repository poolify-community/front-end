import {
    Text,
    Button,
    Flex,
} from "@chakra-ui/react";
import {getIconElement,getLPElement} from 'libs/helpers/tokens';

export default function({props}){
    // Connect this too the poolify factory

    return (
        <Flex flexDirection={'column'} maxHeight={'90vh'} overflowY={'auto'}>
            <Flex alignItems={'center'} justifyContent={'space-between'} marginBottom={'8px'} marginTop={'30px'}>
                <Text>Rewards:</Text>
                <Flex alignItems={'center'}>
                    <Text paddingRight={'5px'}>
                        todo
                    </Text>
                    {getIconElement({tokenA:'POOLIFY'})}
                </Flex>
            </Flex>
            <Flex justifyContent={'center'} flexDirection={'column'}>
                <Button colorScheme='blue' size='lg' width={'100%'} height='48px'>
                    Claim Rewards
                </Button>
            </Flex>
        </Flex>
    )
}
