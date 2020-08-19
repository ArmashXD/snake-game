import React from "react";
import Snake from "./components/Snake";
import Food from "./components/Food";
import swal from "sweetalert";

import { Component } from "react";
import { Container } from "react-bootstrap";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};
const initialState = {
  food: getRandomCoordinates(),
  speed: 60,
  direction: "RIGHT",
  snakeDots: [
    [0, 0],
    [2, 0],
  ],
  score: 0,
  hint: "",
};

class App extends Component {
  state = initialState;
  componentDidMount() {
    //  setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.eat();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 1:
        if (e.keyCode === 32) {
          alert("Game Paused");
        }
        break;
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
    }
  };
  //creating new head for each possible direction
  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots,
    });
  };
  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.gameOver();
    }
  }
  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.gameOver();
      }
    });
  }
  eat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates(),
        score: this.state.score + 1,
      });
      this.largeSnake();
    }
  }

  largeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  }

  gameOver() {
    alert(`Game Over please try again, ${this.state.score}`);
    // swal(`Game Over, Your Score is ${this.state.score}`, {
    //   buttons: ["Play Again", "Exit?"],
    // });
    this.setState(initialState);
  }
  render() {
    return (
      <div>
        <Container>
          <h1 className="score">Score: {this.state.score}</h1>
          <div className="game-area">
            <Snake snakeDots={this.state.snakeDots}></Snake>
            <Food dot={this.state.food} />
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
