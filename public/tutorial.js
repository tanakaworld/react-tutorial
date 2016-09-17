const Comment = React.createClass({
    rawMarkup() {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return {__html: rawMarkup};
    },

    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}/>
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