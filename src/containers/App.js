import React from 'react';
import PropTypes from 'prop-types';
import Picker from './../components/Picker';
import Posts from './../components/Posts';
import { fetchPostsIfNeeded, selectSubreddit, invalidateSubreddit } from "../actions";
import { connect } from 'react-redux';


class App extends React.Component {

    constructor(props) {
        super(props)
    }

    static propTypes = {
        selectedSubreddit: PropTypes.string.isRequired,
        posts: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch, selectedSubreddit } = this.props;
        dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
            const { dispatch, selectedSubreddit } = nextProps;
            dispatch(fetchPostsIfNeeded(selectedSubreddit));
        }
    }

    handleChange = nextSubreddit => {
        this.props.dispatch(selectSubreddit(nextSubreddit))
    }

    handleRefreshClick = e => {
        e.preventDefault();
        const { dispatch, selectedSubreddit } = this.props;
        dispatch(invalidateSubreddit(selectedSubreddit));
        dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }

    render() {
        const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
        const isEmpty = posts.length === 0;
        return (
            <div>
                <Picker value={selectedSubreddit} onChange={this.handleChange} options={['reactjs', 'frontend']} />
                <p>
                    {lastUpdated && <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}</span>}
                    {!isFetching && <button onClick={this.handleRefreshClick}>Refresh</button>}
                </p>
                {isEmpty ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>) : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <Posts posts={posts} />
                </div>}
            </div>
        )
    }

}

const mapStateToProps = state => {
    const { selectedSubreddit, postsBySubreddit } = state;
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsBySubreddit[selectedSubreddit] || {
        isFetching: true,
        items: []
    }

    return {
        selectedSubreddit,
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(App)