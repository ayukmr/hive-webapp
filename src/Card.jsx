import { Component } from 'react';

class Card extends Component {
  render() {
    const { id, num, pollen } = this.props.player;

    return (
      <div>
        <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center' }}>
          <img src={`assets/bees/${num}.png`} />
          {id}
        </h2>

        <div>Pollen: <code>{pollen}</code></div>

        {this.props.hive &&
          <div>Hive: <code>{this.props.hive.pollen}</code></div>}
      </div>
    );
  }
}

export default Card;
