import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import Post from './Post';
import { db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = React.useState([]);
  const [open, setOpen] = useState(false);

// useEffect -> Runs a piece of code based on a specific condition
useEffect(() => {
  db.collection('posts').onSnapshot(snapshot => {
    // every time a change is done on db it will make a snapshot from the db
    setPosts(snapshot.docs.map(doc => ({
      // will return the id of the doc on fb
      id: doc.id,
      // will return the data from fb collection
      post: doc.data()})));
  })
}, []);


  return (
    <div className="App">

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
            <div style={modalStyle} className={classes.paper}>
            <center>
              <img 
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" 
              alt=""/>
            </center>
            </div>
      </Modal>

      <div className="app__header">
        <img 
        className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt=""/>
      </div>
      <Button onClick={() => setOpen(true)}>Sign Up</Button>
      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          ))
      } 
    </div>
  );
}

export default App;
