import React from "react";

export default class BreedImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  getImages = () => {
    let url = "https://dog.ceo/api/breed/";
    url += this.props.subBreedName
      ? `${this.props.breedName}/${this.props.subBreedName}/images`
      : `${this.props.breedName}/images`;

    fetch(url)
      .then(resp => resp.json())
      .then(results => {
        const arr = [];
        for (let i = 0; i < 10 && i < results.message.length; i++) {
          arr.push(results.message[i]);
        }
        this.setState({
          images: arr
        });
      })
      .catch(e => {
        console.log(e.message);
      });
    console.log("I am here");
  };

  componentDidUpdate(prev) {
    if (
      prev.breedName !== this.props.breedName ||
      prev.subBreedName !== this.props.subBreedName
    ) {
      this.getImages();
    }
  }

  render() {
    const breedImages = !!this.state.images.length ? (
      this.state.images.map((elem, i) => <img src={elem} key={i} />)
    ) : (
      <h1>No Images Found :(</h1>
    );

    return <>{breedImages}</>;
  }
}
