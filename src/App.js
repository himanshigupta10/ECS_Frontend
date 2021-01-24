import React, {Component} from 'react';

import AutoComplete from '@material-ui/lab/AutoComplete';
import Button from '@material-ui/core/Button';
import BookList from './BookList';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            Booktitle: [],
            books: [],
            sort: ''
        };

        this.search = this.search.bind(this);
        this.sortbyrating = this.sortbyrating.bind(this);
    }

    componentDidMount() {
        var self = this;

        fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json')
            .then(
                function (response) {
                    if (response.status !== 200) {
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        data.shift();
                        self.setState({
                            apiData: data,
                            books: data
                        });
                    });
                }
            )
            .catch(function (err) {
            });
    }

    search(query) {
        var books = [];
        var Booktitle = [];

        this.state.apiData.forEach(function (book) {
            if (book.title.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                books.push(book);
                Booktitle.push(book.title);
            }
        });

        this.setState({
            books: books,
            Booktitle: Booktitle,
        });
    }

    sortbyrating() {
        if (this.state.sort === "") {
            var books = this.state.books.sort(ratingComparator);
            this.setState({
                books: books,
                sort: 'asc',
            });
        } else if (this.state.sort === 'asc'){
            this.setState({
                books: this.state.books.reverse(),
                sort: 'dsc',
            });
        } else {
            this.setState({
                books: this.state.books.reverse(),
                sort: 'asc',
            });
        }
    }

    render() {
        var BookList = this.state.books.map(function (book, index) {
            return (
                <BookList key={index} data={book}/>
            );
        }, this);

        return (
            <div>
                <center>
                    <div className="margin-3">
                        <AutoComplete
                            hintText="Search..."
                            dataSource={this.state.Booktitle}
                            onUpdateInput={this.search}
                            listStyle={{maxHeight: 200, overflow: 'auto'}}
                            fullWidth={true}
                        />
                        <Button className="margin-3" label={(this.state.sort === "" && "Sort by Rating") || (this.state.sort === "asc" && "Sort by Rating(High to Low)") || (this.state.sort === "dsc" && "Sort by Rating (Low to High)")} primary={true} onClick={this.sortbyrating} />
                    </div>
                </center>
                <div className="margin-3 flex-box">{BookList}</div>
            </div>
        );
    }
}

export default App;

function ratingComparator(a, b) {
    return parseInt(a.score, 10) - parseInt(b.score, 10);
}
