import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  colors: {
    black:'#1d1d1f',
    gray: {
      100:'rgb(244, 244, 244)',
      700: "#1f2733",
      800:'#1d1d1f'
    },
    poolify:{
      200:'#73a8d5',
      400:'#3a83c1'
    }
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: 'SF Pro Text',
        color:'#1d1d1f',
      },
      html: {
        fontFamily: 'SF Pro Text',
        color:'#1d1d1f'
      }
    }),
  },
};
