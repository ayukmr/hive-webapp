import { Component } from 'react';

import Board from './Board';
import Card from './Card';

import './App.css';

class App extends Component {
  state = {
    selected: 0,
    games: [],
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3000/watch');

    this.socket.onmessage = (e) => {
      const { game, players, walls, flowers, hives } = JSON.parse(e.data);

      const games = this.state.games;
      games[game.id] = { game, players, walls, flowers, hives };

      this.setState({ games });
    };
  }

  sendReset() {
    this.socket.send(JSON.stringify({
      type: 'reset',
      game: this.state.selected
    }));
  }

  render() {
    const { selected, games } = this.state;

    const {
      game    = {},
      players = [],
      walls   = [],
      flowers = [],
      hives   = []
    } = games[selected] ?? {};

    return (
      <main>
        <h2 id="turn">Turn {game.turn}</h2>

        <div id="view">
          <Board
            players={players}
            walls={walls}
            flowers={flowers}
            hives={hives}
          />

          <div id="players">
            {[...players]
              .sort((a, b) => a.num > b.num)
              .map((player, i) => <>
                {i !== 0 && <hr />}

                <Card
                  player={player}
                  hive={hives?.find((hive) => hive.player === player.id)}
                />
              </>)}

              {game?.turn === 20 && <>
                <hr />

                <button onClick={() => this.sendReset()}>Reset</button>
              </>}
          </div>
        </div>

        <h2 id="num">
          Game

          <select
            defaultValue={0}
            onChange={(e) => {
              this.setState({ selected: parseInt(e.target.value) });
            }}
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </h2>
      </main>
    );
  }
}

export default App;
