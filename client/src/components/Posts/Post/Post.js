import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Box } from '@material-ui/core/';
import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import InfoIcon from '@material-ui/icons/Info';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import { getPost, likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';
import { grey } from '@material-ui/core/colors';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate ();
  console.log(post);
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
  const Likes = () => {
    if (post?.likes?.length > 0) {
      return <><StarIcon fontSize="small" />Assessed</>
    }

    return <><StarOutlineIcon fontSize="small"  />&nbsp;Pending</>;
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, navigate));

    navigate(`/posts/${post._id}/${post.memberID}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
       
      >
      <Box style={{width:'100%', display:'flex', flexDirection:'row'}}>
      <Box style={{width:'50%',alignItems:'flex-start', padding:'1rem 1rem 0rem 1rem'}}>
      <Typography variant="body2" color="textSecondary" component="p"><CalendarTodayOutlinedIcon style={{fontSize:'0.9rem'}}></CalendarTodayOutlinedIcon> {post.createdAt? `${post.createdAt.split('T')[0]}` : ''} </Typography>
      </Box>
      <Box  style={{width:'50%',alignItems:'flex-end', padding:'0.7rem 0rem 0rem 1rem'}}>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <Box style={{textAlign:'right'}} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: grey[800] }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
          
        </Box>
        )}
        
        </Box>
        </Box>
        <Box style={{ backgroundColor: `#FFEB3B`,
backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='9' viewBox='0 0 90 90'%3E%3Ccircle fill='%234CAF50' cx='45' cy='45' r='5'/%3E%3Cg fill='%23F44336' fill-opacity='1'%3E%3Ccircle cx='0' cy='90' r='5'/%3E%3Ccircle cx='90' cy='90' r='5'/%3E%3Ccircle cx='90' cy='0' r='5'/%3E%3Ccircle cx='0' cy='0' r='5'/%3E%3C/g%3E%3C/svg%3E")`,boxSizing:'border-box',width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', padding:'1rem'}}>
        <Typography  variant='root' component="h3" style={{textAlign:'center', color:grey[800]}}>Member ID</Typography>
          <Typography  variant='root' component="h3" style={{textAlign:'center', color:grey[800]}}>{post.memberID? `${post.memberID}` : ''}</Typography>
        </Box>
        
        <CardContent style={{padding:'0'}}>
        
          <Box style={{width:`100%`,display:'flex',flexDirection:'row',justifyContent:'center',boxSizing:`border-box`,paddingTop:'1rem'}}>
          <Box style={{width:`25%`,display:'flex',flexDirection:'column',justifyContent:'center',boxSizing:`border-box`}}>
          <Box style={{height:`33%`, textAlign:'center'}}><Typography variant="body" color="textSecondary" component="h5">Amount</Typography></Box>
          <Box style={{height:`66%`, textAlign:'center'}}><Typography variant="body" color="textSecondary" component="h5">{post.loanAmount? `${(parseFloat(post.loanAmount)/1000).toFixed(2)}k` : ''} </Typography></Box>
          </Box>
          <Box style={{width:`25%`,display:'flex',flexDirection:'column',justifyContent:'center',boxSizing:`border-box`}}>
          <Box style={{height:`33%`, textAlign:'center'}}><Typography variant="body" color="textSecondary" component="h5">Rate</Typography></Box>
          <Box style={{height:`66%`, textAlign:'center'}}><Typography variant="body" color="textSecondary" component="h5">{post.interestRate? `${post.interestRate}%` : ''}  </Typography></Box>
          </Box>
          <Box style={{width:`25%`,display:'flex',flexDirection:'column',justifyContent:'center',boxSizing:`border-box`}}>
          <Box style={{height:`33%`, textAlign:'center'}}><Typography variant="body" color="textSecondary" component="h5">Term</Typography></Box>
          <Box style={{height:`66%`, textAlign:'center'}}><Typography variant="body" color="textSecondary" component="h5">{post.loanLength? `${post.loanLength}m` : ''} </Typography></Box>
          </Box>
          <Box style={{width:`25%`,display:'flex',flexDirection:'column',justifyContent:'center',boxSizing:`border-box`}}>
          <Box style={{height:`33%`, textAlign:'center'}}><Typography variant="body" color="textSecondary" component="h5">Grade</Typography></Box>
          <Box style={{height:`66%`, textAlign:'center'}}><Typography variant="body" color="textSecondary" component="h2">{post.loanGrade? `${post.loanGrade}` : ''}</Typography></Box>
          </Box>
          </Box>
           </CardContent>
        </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;