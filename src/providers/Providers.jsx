import { ChakraProvider } from '@chakra-ui/react';
import { MoralisProvider } from "react-moralis";
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider,QueryClient } from 'react-query';
import theme from 'theme/theme';
import ModalProvider from './ModalProvider';
import { Provider } from 'react-redux';
import store from 'state/store';

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;
const queryClient = new QueryClient();



const Providers = ({ children }) => {
    //Validate
    if (!APP_ID || !SERVER_URL)
        throw new Error(
            "Missing Moralis Application ID or Server URL. Make sure to set your .env file.",
        );

    return (
        <Provider store={store}>
            <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
                <QueryClientProvider client={queryClient}>
                    <ChakraProvider theme={theme}>
                        <ModalProvider>
                                <Router>{children}</Router>
                        </ModalProvider>
                    </ChakraProvider>
                </QueryClientProvider>
            </MoralisProvider>
        </Provider>
    );
};

export default Providers;