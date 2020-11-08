import React from 'react'
import './Post.css'
import Avatar from "@material-ui/core/Avatar";

function Post() {
    return (
        <div className="post">
            <div className="post__header">
            <Avatar 
            className="post__avatar"
            alt="elias"
            src="/static/images/avatar/1.jpg"
            />
            <h3>Username</h3>
            </div>
            {/* header -> avatar + username */}
            <img className="post__image" src="https://cdn.auth0.com/blog/illustrations/reactjs.png" alt=""/>

            <h4 className="post__text"><strong>Elias:</strong> Criando instagram clone usando react..</h4>
        </div>
    )
}

export default Post
