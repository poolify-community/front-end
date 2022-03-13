// 1. Import the utilities
import { createBreakpoints } from "@chakra-ui/theme-tools";
// 2. Update the breakpoints as key-value pairs


export const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
});


/*
export const breakpoints = createBreakpoints({
  sm: '30em', // 480px
  md: '48em', // 768px
  lg: '64em', // 1024px
  xl: '90em', // 1440px
  xlp1: '100em', // 1600px
  '2xl': '120em', // 1920px
})*/