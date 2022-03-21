import React, { useContext, useState, useCallback } from 'react'
import {
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalCloseButton,
    useDisclosure,
    ModalFooter,
    Text,
} from '@chakra-ui/react';

const ModalContext = React.createContext();

export const useModal = () => {
    const context = useContext(ModalContext)
    if (context === undefined) {
      throw new Error('useModal must be used within a ModalProvider')
    }
  
    return context
}

const ModalProvider = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [modalData, setModalData] = useState();

    const setModal = useCallback(
        (title,body,footer) => {
            setModalData({
                title: title,
                body: body,
                footer: footer
            });
            onOpen();
        },
        [onOpen]
    );

    return (
        <ModalContext.Provider value={{ setModal: setModal,onClose}}>
            <Modal 
                isOpen={isOpen}
                onClose={onClose}
                style={{ fontSize: "16px", fontWeight: "500" }}
                width="400px"
            >
                <ModalOverlay />
                <ModalContent
                    border="1px"
                    borderStyle="solid"
                    borderRadius="3xl"
                >
                    <ModalHeader 
                        px={4} 
                        fontSize="lg" 
                        fontWeight="medium" 
                        borderTopLeftRadius="3xl"
                        borderTopRightRadius="3xl"
                    >
                        {modalData?.title}
                    </ModalHeader>
                    <ModalCloseButton
                        color="black"
                        fontSize="sm"
                        _hover={{
                            color: "gray.700",
                        }}
                    />
                    <ModalBody pt={0} px={4}>
                        {modalData?.body}
                    </ModalBody>
                    

                    {modalData?.footer?
                        <ModalFooter
                            justifyContent="end"    
                            borderBottomLeftRadius="3xl"
                            borderBottomRightRadius="3xl"
                            p={6}
                        >
                            {modalData?.footer}
                        </ModalFooter>
                        :
                        <></>
                    }
                   
                </ModalContent>
            </Modal>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
