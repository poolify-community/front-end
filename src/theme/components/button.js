export const buttonStyles = {
  components: {
    Button: {
      variants: {
        "poolify":{
          backgroundColor:'poolify.400',
          color:'white',
          marginLeft:'2px',
          marginRight:'2px',
          _hover: {
            backgroundColor:'poolify.600',
            color:'white'
          },
        },
        "poolify-transparent":{
          marginLeft:'2px',
          marginRight:'2px',
          _hover: {
            color:'poolify.400'
          },
        },
        "poolify-reverse":{
          backgroundColor:'white',
          color:'poolify.400',
          marginLeft:'2px',
          marginRight:'2px',
          _hover: {
            backgroundColor:'gray.200',
            color:'white'
          },
        },
        "wallet-connection":{
          backgroundColor:'transparent',
          border:'1px solid white',
          color:'poolify.600',
          marginLeft:'2px',
          marginRight:'2px',
          _hover: {
            backgroundColor:'poolify.600',
            color:'white',
            borderColor:'poolify.600',
            borderStyle:'solid',
            borderWidth:'1px',
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
        borderRadius: "4px",
        transition: "all .2s ease-in-out",
        margin:"5px",
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
};
