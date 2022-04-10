import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  colors: {
    black:'#1d1d1f',
    dark:'#1d2835f2',
    warning:'#ff9f0c',
    information:'#4e9cff',
    gray: {
      100:'rgb(244, 244, 244)',
      200:'#e2e8f0',
      700: "#1f2733",
      800:'#1d1d1f'
    },
    poolify:{
      200:'#73a8d5',
      400:'#3a83c1',
      600:'#2b6cb0'
    }
  },
  size:{
    10:'2.5rem',
    12:'3rem'
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: 'Chakra Petch, Kanit, sans-serif',
        //color:'#304073',
        color:'#FFF'
      },
      html: {
        fontFamily: 'Chakra Petch, Kanit, sans-serif',
        //color:'#304073'
        color:'#FFF'
      }
    }),
  },
};
