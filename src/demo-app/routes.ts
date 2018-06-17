import { Routes } from '@angular/router';

import { AppBarDemo } from './components/app-bar/app-bar-demo';
import { ButtonDemo, FabDemo, IconButtonDemo, IconToggleDemo } from './components/buttons';
import { CardDemo } from './components/card-demo/card-demo';
import { CheckboxDemo, RadioDemo, SelectDemo, SliderDemo, SwitchDemo, TextFieldDemo } from './components/inputs-controls';
import { ChipsDemo } from './components/chips-demo/chips-demo';
import { DIALOG_DEMO_ROUTES } from './components/dialog-demo/routes';
import { DialogDemo, DialogTab, DialogServiceTab } from './components/dialog-demo/dialog-demo';
import { DrawerDemo } from './components/drawer-demo/drawer-demo';
import { ElevationDemo } from './components/elevation-demo/elevation-demo';
import { FormFieldDemo } from './components/inputs-controls/form-field-demo/form-field-demo';
import { GettingStarted, CliGuide } from './getting-started';
import { Home } from './home/home';
import { IconDemo } from './components/icon-demo/icon-demo';
import { LinearProgressDemo } from './components/linear-progress-demo/linear-progress-demo';
import { ListDemo, GridListDemo, ImageListDemo } from './components/lists';
import { MenuDemo } from './components/menu-demo/menu-demo';
import { RippleDemo } from './components/ripple-demo/ripple-demo';
import { ShapeDemo } from './components/shape-demo/shape-demo';
import { SnackbarDemo } from './components/snackbar-demo/snackbar-demo';
import { TabDemo } from './components/tab-demo';
import { ToolbarDemo } from './components/toolbar-demo/toolbar-demo';
import { TypographyDemo } from './components/typography-demo/typography-demo';

import { TABS_DEMO_ROUTES } from './components/tab-demo';

export const DEMO_ROUTES = [
  AppBarDemo,
  ButtonDemo,
  CardDemo,
  CheckboxDemo,
  ChipsDemo,
  CliGuide,
  DialogDemo,
  DialogTab,
  DialogServiceTab,
  DrawerDemo,
  ElevationDemo,
  FabDemo,
  FormFieldDemo,
  GettingStarted,
  GridListDemo,
  Home,
  IconDemo,
  IconButtonDemo,
  IconToggleDemo,
  ImageListDemo,
  LinearProgressDemo,
  ListDemo,
  MenuDemo,
  RadioDemo,
  RippleDemo,
  SelectDemo,
  SliderDemo,
  ShapeDemo,
  SnackbarDemo,
  SnackbarDemo,
  SwitchDemo,
  TabDemo,
  TextFieldDemo,
  ToolbarDemo,
  TypographyDemo,
];

export const APP_ROUTES: Routes = [
  { path: 'app-bar-demo', component: AppBarDemo },
  { path: 'button-demo', component: ButtonDemo },
  { path: 'card-demo', component: CardDemo },
  { path: 'checkbox-demo', component: CheckboxDemo },
  { path: 'chips-demo', component: ChipsDemo },
  { path: 'cli-guide', component: CliGuide },
  { path: 'dialog-demo', component: DialogDemo, children: DIALOG_DEMO_ROUTES },
  { path: 'drawer-demo', component: DrawerDemo },
  { path: 'elevation-demo', component: ElevationDemo },
  { path: 'fab-demo', component: FabDemo },
  { path: 'form-field-demo', component: FormFieldDemo },
  { path: 'getting-started', component: GettingStarted },
  { path: 'grid-list-demo', component: GridListDemo },
  { path: 'home', component: Home, pathMatch: 'full' },
  { path: 'icon-demo', component: IconDemo },
  { path: 'icon-button-demo', component: IconButtonDemo },
  { path: 'icon-toggle-demo', component: IconToggleDemo },
  { path: 'image-list-demo', component: ImageListDemo },
  { path: 'linear-progress-demo', component: LinearProgressDemo },
  { path: 'list-demo', component: ListDemo },
  { path: 'menu-demo', component: MenuDemo },
  { path: 'radio-demo', component: RadioDemo },
  { path: 'ripple-demo', component: RippleDemo },
  { path: 'select-demo', component: SelectDemo },
  { path: 'slider-demo', component: SliderDemo },
  { path: 'shape-demo', component: ShapeDemo },
  { path: 'snackbar-demo', component: SnackbarDemo },
  { path: 'switch-demo', component: SwitchDemo },
  { path: 'tab-demo', component: TabDemo, children: TABS_DEMO_ROUTES },
  { path: 'textfield-demo', component: TextFieldDemo },
  { path: 'toolbar-demo', component: ToolbarDemo },
  { path: 'typography-demo', component: TypographyDemo },
  { path: '**', redirectTo: 'home' }
];
