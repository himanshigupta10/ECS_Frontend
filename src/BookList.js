import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

class BookList extends Component {
    render() {
        var authors = this.props.data.genre.split(',');
        var authorlist = authors.map(function (author, index) {
            return (
                <Chip key={index} style={{margin: '5% 0 5% 0'}}><Avatar size={32}>{authors[index][0]}</Avatar>{authors}</Chip>
            );
        }, this);

        return (
            <div className="box">
            <Card>
                <CardHeader
                    title={this.props.data.title}
                    subtitle={this.props.data.language_code}
                    subtitle={this.props.data.ratings_count}
                    subtitle={this.props.data.price}
                    actAsExpander={false}
                    showExpandableButton={false}
                />
                <CardText>
                    <strong>Rating: {this.props.data.average_rating} / 10</strong>
                    <div>
                        {this.props.data.author !== '' && authorlist}
                      </div>
                    <LinearProgress mode="determinate" value={this.props.data.rating * 10}/>
                </CardText>
            </Card>
            </div>
        );
    }
}

export default BookList;
