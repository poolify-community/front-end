import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./styles";
import { fonts } from "./foundations/fonts";
import { breakpoints } from "./foundations/breakpoints";
import { buttonStyles } from "./components/button";
import { smartTagStyles } from "./components/smartTag";
import { cardTagStyles } from "./components/cardTag";
import { textStyles } from "./components/text";
import { badgeStyles } from "./components/badge";
import { linkStyles } from "./components/link";
import { drawerStyles } from "./components/drawer";
import { navbarStyles } from "./components/navbar";
import { CardComponent } from "./additions/card/Card";
import { CardBodyComponent } from "./additions/card/CardBody";
import { CardHeaderComponent } from "./additions/card/CardHeader";
import { MainPanelComponent } from "./additions/layout/MainPanel";
import { PanelContentComponent } from "./additions/layout/PanelContent";
import { PanelContainerComponent } from "./additions/layout/PanelContainer";
// import { mode } from "@chakra-ui/theme-tools";


export default extendTheme(
  { breakpoints }, // Breakpoints
  globalStyles, // Global styles
  { fonts }, // Fonts
  buttonStyles, // Button styles
  smartTagStyles, // SmartTags
  textStyles, // Text Styles
  badgeStyles, // Badge styles
  linkStyles, // Link styles
  drawerStyles, // Sidebar variant for Chakra's drawer
  navbarStyles, // Navbar Style component
  cardTagStyles, // Card Tag component
  CardComponent, // Card component
  CardBodyComponent, // Card Body component
  CardHeaderComponent, // Card Header component
  MainPanelComponent, // Main Panel component
  PanelContentComponent, // Panel Content component
  PanelContainerComponent // Panel Container component
);

