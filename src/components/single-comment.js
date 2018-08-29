import React from 'react';

export default function Comment(props) {
	return <li class="comment-box">
			<div class="comment-header">
				<span id="comment-author">{props.user}</span> - <span id="comment-time">{props.time}</span><span id="comment-emojis">❤️</span>
			</div>
			<div class="comment-body"> 
				{props.body}
			</div>
		</li>
}