import { createMuiTheme } from '@material-ui/core/styles';
import 'typeface-roboto';

const palette = {
  primary: {
    main: '#37474F',
  },
  secondary: {
    main: '#9E9E9E',
  },
};

const typography = {
  fontFamily: [
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  htmlFontSize: 10,
};

const theme = createMuiTheme({ palette, typography });

export default theme;
