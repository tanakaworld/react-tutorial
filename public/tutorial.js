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
    getInitialState() {
        return {author: '', text: ''}
    },

    handleAuthorChange(e) {
        this.setState({author: e.target.value});
    },

    handleTextChange(e) {
        this.setState({text: e.target.value});
    },

    handleSubmit(e) {
        e.preventDefault();
        const author = this.state.author.trim();
        const text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    },

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text"
                       placeholder="Yout name"
                       value={this.state.author}
                       onChange={this.handleAuthorChange}
                />
                <input type="text"
                       placeholder="Say something"
                       value={this.state.text}
                       onChange={this.handleTextChange}
                />
                <input type="submit" value="Post"/>
            </form>
        )
    }
});

const CommentBox = React.createClass({
    loadCommentsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        })
    },

    handleCommentSubmit(comment)  {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    getInitialState() {
        return {data: []};
    },

    componentDidMount() {
        this.loadCommentsFromServer();
        //setInterval(this.loadCommentsFromServer, this.props.pollInterval)
    },

    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox
        url="http://www.mocky.io/v2/57dd18440f00008114a2d515"
        pollInterval={2000}
    />,
    document.getElementById('content')
);