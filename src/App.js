import logo from './logo.svg';
import './App.css';
import Post from './Post';
import React, { useEffect, useState } from "react";
import { db } from './firebase';
function App() {

  const [posts, setPosts] = React.useState([
    {
      username:"Elias",
      caption:"Criando instagram usando react",
      imageUrl:"https://cdn.auth0.com/blog/illustrations/reactjs.png"
    },
    {
      username:"Elias",
      caption:"Criando instagram usando react",
      imageUrl:"https://cdn.auth0.com/blog/illustrations/reactjs.png"
    }
  ]);
// useEffect -> Runs a piece of code based on a specific condition
useEffect(() => {
  db.collection('posts').onSnapshot(snapshot => {
    // every time a change is done on db it will make a snapshot from the db
    setPosts(snapshot.docs.map(doc => doc.data()))
  })
}, []);

  return (
    <div className="App">
      <div className="app__header">
        <img 
        className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt=""/>
      </div>

      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          ))
      } 
    </div>
  );
}

export default App;
