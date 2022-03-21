import {
    Text,
    Button,
    Flex,
    Heading,
    Spacer
} from "@chakra-ui/react";
import Card from 'components/Card/Card';
import {getIconElement,getLPElement} from 'libs/helpers/tokens';

const styles = {
    bountyText:{
        paddingRight:'5px',
        fontSize: '20px',
        lineHeight: '1.07143',
        fontWeight: '600',
        letterSpacing: '-.005em'
    }
}

export default function({bounty,props}){
    return (
        <Card>
            <Flex flexDirection={'column'} maxHeight={'90vh'} overflowY={'auto'} padding={'24px'} >
                <Flex flexDirection={'column'} maxHeight={'90vh'} overflowY={'auto'}>
                    <Flex justifyContent={'space-between'}>
                        <Heading size={'md'} color={'black'}> Auto PLFY Bounty</Heading>
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'space-between'} marginBottom={'8px'} marginTop={'30px'}>
                        <Spacer/>
                        <Flex alignItems={'center'}>
                            <Text style={styles.bountyText}>
                                {bounty?bounty:'0'}
                            </Text>
                            {getIconElement({tokenA:'POOLIFY'},'lg')}
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
