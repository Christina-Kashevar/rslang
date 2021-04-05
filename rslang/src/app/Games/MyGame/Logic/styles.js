import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  answer:{
    animation: `$answer 3000ms ${theme.transitions.easing.easeInOut}`,
    width: 100,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 12,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 15,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 20,
    },
  },
  answerHidden:{
    opacity: 0,
    animation: `$answer 3000ms ${theme.transitions.easing.easeInOut}`,
    width: 100,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 12,
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: 15,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 20,
    },
  },
  '@keyframes answer': {
    '0%':{
       top: 70,
       transform: 'scale3d(1.5, 1.5, 1.5)',
     },
     '100%': {
       top: 300,
       transform: 'scale3d(1, 1, 1)',
     }
   },
  statictic:{
    marginBottom: '1em',
    height: 50,
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
        fontSize: 10,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        fontSize: 12,
      },
      [theme.breakpoints.between('md', 'lg')]: {
        fontSize: 15,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: 20,
      },
},
media:{
  border: 'solid 1px black',
  borderRadius: 5,
  cursor: 'pointer',
  width: 30,
  height: 30,
},

}));


export default useStyles;