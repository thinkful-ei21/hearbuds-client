import React from 'react';

require('./comments.css');

export default function Comment(props) {
	return <li className="comment-box">
			<div className="comment-header">
				<span id="comment-author">{props.user}</span> - <span id="comment-time">{props.time}</span><span id="comment-emojis">❤️</span>
			</div>
			<div className="comment-body"> 
				{props.body}
			</div>
		</li>
}