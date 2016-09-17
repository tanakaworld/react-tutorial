const Comment = React.createClass({
    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        )
    }
});

const CommentList = React.createClass({
    render() {
        return (
            <div className="commentList">
                <Comment author="Tanaka World 1">This is one comment</Comment>
                <Comment author="TNK WD">This is "another" comment</Comment>
            </div>
        );
    }
});
const CommentForm = React.createClass({
    render() {
        return (
            <div className="commentForm">
                CommentForm
            </div>
        )
    }
});

const CommentBox = React.createClass({
    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList />
                <CommentForm />
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox />,
    document.getElementById('content')
);