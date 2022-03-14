import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider,QueryClient } from 'react-query';
import theme from 'theme/theme';
import ModalProvider from './ModalProvider';
import { Provider } from 'react-redux';
import store from 'state/store';

const queryClient = new QueryClient();



const Providers = ({ children }) => {

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider theme={theme}>
                    <ModalProvider>
                            <Router>{children}</Router>
                    </ModalProvider>
                </ChakraProvider>
            </QueryClientProvider>
        </Provider>
    );
};

export default Providers;