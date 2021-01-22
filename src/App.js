import React from "react";
import Image from "./Image";
import BreedList from "./BreedList";
import BreedImages from "./BreedImages";
import { Button } from "@material-ui/core";

const divStyle = {
  width: "100%",
  maxWidth: 600,
  margin: "10px auto",
  height: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const imageStyle = {
  flex: 1,
  padding: 10
};

const buttonStyle = {
  width: "100px"
};
const breedListStyle = {
  width: "200px",
  float: "left",
  display: "block",
  marginLeft: "6%",
  backgroundColor: "rgb(240, 236, 236)"
};
const breedListPics = {
  width: "50%",
  padding: "5px",
  height: "300px",
  display: "flex",
  float: "left"
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSrc: 0,
      length: 3,
      breed: null,
      breedName: "",
      subBreedName: ""
    };
  }

  getBreedImages = (breed, subBreed) => {
    console.log(breed + " " + subBreed);
    this.setState({
      breedName: breed,
      subBreedName: subBreed
    });
  };

  next = () => {
    this.setState(prev => ({
      currentSrc: (prev.currentSrc + 1) % this.state.length
    }));
  };

  previous = () => {
    this.setState(prev => ({
      currentSrc:
        prev.currentSrc === 0
          ? this.state.length - 1
          : this.state.currentSrc - 1
    }));
  };

  getBreed = () => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(resp => resp.json())
      .then(results =>
        this.setState({
          breed: results.message
        })
      )
      .catch(e => {
        console.log(e.message);
      });
  };

  componentDidMount = () => {
    this.play();
    this.getBreed();
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  play = () => {
    this.interval = setInterval(this.next, 1500);
  };

  render() {
    const { breed } = this.state;
    const lists = breed ? (
      Object.keys(this.state.breed).map((key, i) => (
        <BreedList
          getBreedImages={this.getBreedImages}
          key={i}
          breed={key}
          subBreed={this.state.breed[key]}
          exists={this.state.breed[key].length}
        />
      ))
    ) : (
      <></>
    );
    return (
      <div>
        <div style={divStyle}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.previous}
            style={buttonStyle}
            margin=""
          >
            Previous
          </Button>
          <div style={imageStyle}>
            <Image currentSrc={this.state.currentSrc} />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.next}
            style={buttonStyle}
          >
            Next
          </Button>
        </div>
        <div style={breedListStyle}>{lists}</div>
        <div style={breedListPics}>
          <BreedImages
            breedName={this.state.breedName}
            subBreedName={this.state.subBreedName}
          />
        </div>
      </div>
    );
  }
}
