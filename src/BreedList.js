import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Icon,
  Fab
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import AddIcon from "@material-ui/icons/Add";

export default class BreedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.getBreedImages = this.props.getBreedImages.bind(this);
  }

  handleClick = () => {
    this.setState(prev => ({
      open: !prev.open
    }));
  };

  render() {
    return (
      <List>
        <ListItem button>
          <Fab color="primary" aria-label="add">
            <AddIcon
              onClick={() => this.getBreedImages(this.props.breed, null)}
            />
          </Fab>
          <ListItemText
            primary={this.props.breed}
            style={{ marginLeft: "10px" }}
          />
          {this.props.exists ? (
            <Icon onClick={this.handleClick}>
              {!this.state.open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </Icon>
          ) : null}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {this.props.subBreed.map((elem, i) => (
              <ListItem
                button
                key={i}
                style={{ backgroundColor: "violet" }}
                onClick={e => {
                  this.getBreedImages(this.props.breed, elem);
                }}
              >
                <ListItemText primary={elem} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    );
  }
}
