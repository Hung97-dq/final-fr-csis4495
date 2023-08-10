import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: '1px',
  },
  actionDiv: {
    textAlign: 'center',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1400,
    },}
}));