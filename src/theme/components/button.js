export const buttonStyles = {
  components: {
    Button: {
      variants: {
        "wallet-connection":{
          backgroundColor:'black',
          color:'white',
          marginLeft:'2px',
          marginRight:'2px',
          _hover: {
            backgroundColor:'poolify.600',
          },
        },
        "poolify-slider":{
          backgroundColor:'poolify.400',
          color:'white',
          marginLeft:'2px',
          marginRight:'2px',
          _hover: {
            backgroundColor:'poolify.600',
          },
        },
        "no-hover": {
          _hover: {
            boxShadow: "none",
          },
        },
        "transparent-with-icon": {
          bg: "transparent",
          fontWeight: "bold",
          borderRadius: "inherit",
          cursor: "pointer",
          _hover: "none",
          _active: {
            bg: "transparent",
            transform: "none",
            borderColor: "transparent",
          },
          _focus: {
            boxShadow: "none",
          },
          _hover: {
            boxShadow: "none",
          },
        },
      },
      baseStyle: {
        borderRadius: ".25rem",
        margin:"5px",
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
};
