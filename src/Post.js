import React, { useState, useEffect } from 'react'
import './Post.css'
import Avatar from "@material-ui/core/Avatar";
import { db } from './firebase';
import { Button, Input } from '@material-ui/core';

function Post({username, postId, caption, imageUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    useEffect(() => {
        let unsubscribe;
        if (postId){
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            unsubscribe();
        }
    }, [postId]);

    const postComment = (event) => {
        

        event.preventDefault();
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post__avatar"
                    alt="elias"
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>
            {/* header -> avatar + username */}
            <img className="post__image" src={imageUrl} alt=""/>
            <h4 className="post__text"><strong>{username}:</strong>{caption}</h4>
        
            <div className="post__comments">
                {comments.map((comment) => (
                <p>
                    <strong> {comment.username} </strong> {comment.text}
                </p>
                ))}
            </div>

            <form className="post__commentBox">
            <input
                type="text"
                className="post__input"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <Button
                className="post__button"
                disabled={!comment}
                type="submit"
                onClick={postComment}
            >
                Post
            </Button>
            </form>
        </div>
    )
}

export default Post
