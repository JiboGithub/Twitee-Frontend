import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'

const styles = {
	paper: {
		padding: 10,
		display: 'flex',
		marginTop: 10,
	},
	avatar: {
		minWidth: 10,
		margin: '4px 10px 4px 4px'
	},
	login: {
		marginBottom: 5
	},
	time: {
		marginLeft: 10,
		color: '#bbb',
		fontSize: 14
	}
}

class Post extends Component {
	render () {
		const { classes, post } = this.props
		return (
			<Paper className={classes.paper}>
				<div 
					className={classes.avatar}
					style={{
						backgroundColor: `#${post.userId}`
					}}
				/>
				<div>
					<h3 className={classes.login}>
						<Link to={`/profile/${post.userId}`}>{post.userName}</Link>
						<span className={classes.time}>
						 
						 <p className={classes.login}>{}
						 {post.tweet}</p></span>

						 <p className={classes.time}>{}
						 {post.createdAt}</p>
					</h3>
					{post.text}
				</div>
			</Paper>
		)
	}
}


export default withStyles(styles)(Post)