const data = [
    {id: 1, author: "Tanaka World 1", text: "あいうえお"},
    {id: 2, author: "Tanaka World 2", text: "かきくけこ"}
];


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
        const commentNodes = this.props.data.map((comment) => {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        )
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
                <CommentList data={this.props.data}/>
                <CommentForm />
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox data={data}/>,
    document.getElementById('content')
);