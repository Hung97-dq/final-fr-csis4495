import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',

  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  cardRow: {
    display: 'flex',
    width: '100%',
    paddingBottom: '1rem',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '1rem',
    margin: '10px',
    flex: 1,
  },
  sectionRow: {
    borderRadius: '1rem',
    flex: 1,
  },
  imageSection: {
    marginLeft: '1rem',
    height: "20.25rem",
    width:"50%", 
    borderRadius: '1rem', 
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width:"100%",
      height: "16rem",
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: '1rem'
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
    padding: '1rem'
  },
  homeIcon: {
    fontSize: '2.5rem',
  },
  homeBox: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    padding: '0.2rem',
    textAlign: 'center',
    borderRadius: '50%'
  },
  detailBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    }}
}));