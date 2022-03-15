import {
    Box,
    Text,
    Flex,
    GridItem,
    Heading,
} from "@chakra-ui/react";

import { formatApy } from 'libs/helpers/format';

const yearlyToDaily = apy => {
    const g = Math.pow(10, Math.log10(apy + 1) / 365) - 1;
  
    if (isNaN(g)) {
      return 0;
    }
  
    return g;
  };

  
export default function({apy,...props}){
    const values = {};

    values.totalApy = apy.totalApy;
    values.totalDaily = yearlyToDaily(values.totalApy);

    if ('vaultApr' in apy && apy.vaultApr) {
      values.vaultApr   = apy.vaultApr;
      values.vaultDaily = apy.vaultApr / 365;
    }

    const formatted = Object.fromEntries(
      Object.entries(values).map(([key, value]) => {
        const formattedValue = key.toLowerCase().includes('daily')
          ? formatApy(value, 4)
          : formatApy(value);
        return [key, formattedValue];
      })
    );

  
    console.log('formatted',formatted);


    return (
      <>
      <GridItem w='100%' h='70px'>
          <Flex alignItems={'center'} justifyContent={'center'} h='inherit'>
              <Box marginLeft={'15px'}>
                <Heading size={'xs'}>APY</Heading>
                <Text>{formatted.totalApy}</Text>
              </Box>
          </Flex>
      </GridItem>
      <GridItem w='100%' h='70px'>
            <Flex alignItems={'center'} justifyContent={'center'} h='inherit'>
              <Box marginLeft={'15px'}>
                <Heading size={'xs'}>Daily</Heading>
                <Text>{formatted.totalDaily}</Text>
              </Box>
            </Flex>
        </GridItem>
      </>
    );
}