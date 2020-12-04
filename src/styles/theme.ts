import { createMuiTheme } from '@material-ui/core';

const theme = {
  colors: {
    background: '#121214',
    text: '#e1e1e6',
    primary: '#FBA920',
  },
};

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#FBA920',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
  overrides: {
    MuiInputLabel: {
      // Name of the component ⚛️ / style sheet
      root: {
        // Name of the rule
        color: 'orange',
        '&$focused': {
          // increase the specificity for the pseudo class
          color: 'blue',
        },
      },
    },
  },
});

export default theme;
