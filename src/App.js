import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import Post from './Post';
import { auth, db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';


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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn]= useState(false);

  // backend listener
  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){
        // user has logged in.. 
        console.log(authUser);
        setUser(authUser);
      }else {
        // user has logged out..
        setUser(null);
      }
    })

    return () => {
      // perform some cleanup actions
      // setUser(null) <<<====
      unsubscribe();
    }
  }, [user, username]);

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

const signUp = (event ) => {
  auth.createUserWithEmailAndPassword(email, password)
  .then((authUser) => {
    authUser.user.updateProfile({
      displayName: username
    })
  })
  .catch((error) => alert(error.message));

  event.preventDefault();
}

const signIn = (event) => {
  auth.signInWithEmailAndPassword(email, password)

  .catch((error) => alert(error.message));
  event.preventDefault();

  setOpenSignIn(false);
}
  return (
    <div className="App">
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
          <div style={modalStyle} className={classes.paper}>
            <center>
            <form action="" className="app__signup">
              <img 
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" 
              alt=""/>
            
                <Input 
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                /> 
                <Input 
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                /> 
                <Input 
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /> 
              <Button type="submit" onClick={signUp}> Sign up </Button>
              {/* <Button onClick={handleLogin}> Login </Button> */}
              </form>
            </center>
          </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
          <div style={modalStyle} className={classes.paper}>
            <center>
            <form action="" className="app__signup">
              <img 
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" 
              alt=""/>
          
                <Input 
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                /> 
                <Input 
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /> 
              <Button type="submit" onClick={signIn}> Sign In </Button>
              {/* <Button onClick={handleLogin}> Login </Button> */}
              </form>
            </center>
          </div>
      </Modal>

      <div className="app__header">
        <img 
        className="app__headerImage" 
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt=""/>
      {user ?(
      <Button onClick={() => auth.signOut()}>Logout</Button>
      )
      :(
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      </div>

      
      <div className="app__posts">
        <div className="app__postsLeft">
          {
          posts.map(({id, post}) => (
            <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            ))
          } 
        </div>
      <div className="app__postsRight">
      <InstagramEmbed
            url="https://instagr.am/p/Zw9o4/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
      </div>
      </div>
      

     {user?.displayName ? (
         <ImageUpload username={user.displayName}/>
      ): (
        <h3>You need to login to upload!</h3>
      )}
      
    </div>
  );
}

export default App;
