export const linkStyles = {
  components: {
    Link: {
      // 3. We can add a new visual variant
      decoration: "none",
      baseStyle: {
        _hover: {
          textDecoration: "none",
        },
        _focus: {
          boxShadow: "none",
        },
      },
      variants: {
        "poolify-links":{
          color:'poolify.400'
        },
        "poolify-links-white":{
          color:'white'
        },
        "poolify-links-green":{
          color:'green.500'
        }
      },
    },
  },
};
