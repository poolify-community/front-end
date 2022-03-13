import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import {useState} from 'react';
import {
    Button,FormControl,FormLabel,HStack,
    Input,InputGroup,InputRightElement,
    Menu,MenuButton,MenuItem,MenuList,
    Stack,Switch,Text,Heading
} from '@chakra-ui/react';
import { useConnectWallet } from 'libs/hooks/useConnector';


const Controls = (props) => {
    const [filterSettings, setFilterSettings] = useState({
        searchKey:'',
        stakedOnly:false,
        type:'live',
        sortBy:'CreatedDate'

    });
    const { connectWallet, web3, address, networkId, connected } = useConnectWallet();

    const onOnlyStakedChange = (e) => {
        setFilterSettings(prevState => ({
            ...prevState,
            stakedOnly:!prevState.stakedOnly
        }));
    }

    const onSearchKeyChange = (e) => {
        setFilterSettings(prevState => ({
            ...prevState,
            searchKey:e.target.value
        }));
    }


useState
    return (
        <HStack
            w="100%"
            alignItems="start"
            py="34px"
            justifyContent={{ base: 'space-between' }}
            spacing="20px"
        >
            <InputGroup w="310px" h="41px" mt="-4px">
                <Input
                    variant="filled"
                    placeholder="Search Tokens or Pools"
                    size="lg"
                    fontSize="12px"
                    onChange={(e) => onSearchKeyChange(e)}
                    value={filterSettings.searchKey || ''}
                />
                <InputRightElement h="100%" mt="4px">
                    <SearchIcon boxSize={5} />
                </InputRightElement>
            </InputGroup>

            <Stack
                direction={{ base: 'column-reverse', xl: 'row' }}
                flexGrow={{ base: 0, xl: 1 }}
                justifyContent="flex-end"
            >
                {address && (
                    <FormControl display="flex" alignItems="center" w="unset">
                        <FormLabel
                            fontSize="12px"
                            fontWeight="500"
                            ml={{ base: 'unset', lg: '20px' }}
                            pt="6px"
                        >
                            <Heading as='h3' size={{ sm:'md', base: 'md'}}>Show Staked Only</Heading>
                        </FormLabel>
                        <Switch
                            isChecked={filterSettings.stakedOnly}
                            onChange={(e) => onOnlyStakedChange(e)}
                            size="lg"
                        ></Switch>
                    </FormControl>
                )}
            </Stack>
        </HStack>
    );
};

export default Controls;
