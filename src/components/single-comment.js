import React from 'react';

export default function Comment(props) {
	return <li class="comment-box">
			<div class="comment-header">
				<span id="comment-author">{props.user}</span>
			</div>
			<div class="comment-body"> 
				{props.body}
			</div>
		</li>
}