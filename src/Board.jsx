import { Component } from 'react';

import './Board.css';

class Board extends Component {
  render() {
    const { players, walls, flowers, hives } = this.props;

    return (
      <div className="board">
        {[...Array(15)].map((_, y) => (
          [...Array(15)].map((_, x) => {
            const tilePlayers = players.filter(
              (p) => p.x === x && p.y === y
            );

            return <div className="cell">
              <img src="assets/tiles/grass.png" />

              <Object img="assets/tiles/wall.png"   objects={walls}   x={x} y={y} />
              <Object img="assets/tiles/flower.png" objects={flowers} x={x} y={y} />
              <Object img="assets/tiles/hive.png"   objects={hives}   x={x} y={y} />

              {tilePlayers.map((player, i) => {
                const offset = 32 / (tilePlayers.length + 1) * (i + 1);

                return <img
                  className="player"
                  src={`assets/bees/${player.num}.png`}
                  style={{ translate: `${offset}% ${offset}%` }}
                />;
              })}
            </div>;
          })
        ))}
      </div>
    );
  }
}

class Object extends Component {
  render() {
    const { img, objects, x, y } = this.props;

    const object = objects.find(
      (obj) => obj.x == x && obj.y == y
    );

    return object ? <img src={img} /> : <></>;
  }
}

export default Board;
