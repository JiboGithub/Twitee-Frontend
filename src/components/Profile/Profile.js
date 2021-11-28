import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import { connect } from 'react-redux'
import { 
	getPostsByUserId,
	getUserProfile,
	refreshUserProfile
} from '../../actions/profileActions'
import Post from '../Posts/Post'
import LoadingPosts from '../Posts/LoadingPosts'

const styles = {
	paper: {
		padding: 10
	},
	login: {

	},
	email: {
		color: '#888',
		marginBottom: 10
	},
	detailsBlock: {
		display: 'flex'
	},
	detail: {
		marginRight: 5,
		fontWeight: 'bold'
	},
	detailTitle: {
		marginLeft: 3,
		textTransform: 'uppercase',
		fontSize: 10,
		fontWeight: 'normal'
	},
	btnBlock: {
		width: '100%',
		textAlign: 'right'
	}
}

class Profile extends Component {
	componentDidMount() {
		this.props.getPostsByUserId(this.props.match.params.userId)
		this.props.getUserProfile(this.props.match.params.userId)
	}


	render () {
		const { 
			classes,
			loadingPosts,
			loadingProfile,
			list,
			auth,
			user,
			profile 
		} = this.props
		if (auth.isAuthenticated && user) {
			let items;
			items = list && list.map(el => <Post key={el._id} post={el}/>)
			let profileInfo
			if (profile && items) {
				profileInfo = (
					<Paper className={classes.paper}>
						<h1 className={classes.login}>{profile.login}</h1>
						<div className={classes.email}>{profile.email}</div>
						<div className={classes.detailsBlock}>
							<div className={classes.detail}>
								{items.length}
								<span className={classes.detailTitle}>posts</span>
							</div>
						</div>
					</Paper>
				)
			}

			return (
				<div>
					{ loadingProfile ? <div>Loading</div> : profileInfo }
					{ loadingPosts ? <LoadingPosts /> : items }
				</div>
			)
		}
	}
}



const mapStateToProps = (state) => ({
	loadingPosts: state.post.loading,
	list: state.post.list,
	profile: state.profile.user,
	loadingProfile: state.profile.loading,
	auth: state.auth,
	user: state.auth.user
})

export default connect(mapStateToProps, 
	{ 
		getPostsByUserId, 
		getUserProfile, 

		refreshUserProfile 
	})(withStyles(styles)(Profile))