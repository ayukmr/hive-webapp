import { Component } from 'react';

class Card extends Component {
  render() {
    const { id, num, pollen } = this.props.player;

    return (
      <div>
        <h2>
          <img src={`assets/bees/${num}.png`} />
          <span>{id}</span>
        </h2>

      {this.props.hive &&
        <>
          <div>Pollen: <code>{pollen}</code></div>
          <div>Hive: <code>{this.props.hive.pollen}</code></div>
        </>}
      </div>
    );
  }
}

export default Card;
