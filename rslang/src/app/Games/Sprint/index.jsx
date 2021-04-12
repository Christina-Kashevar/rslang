import React, { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Grid, Container } from '@material-ui/core';
import StartGameMenu from '../components/StartGameMenu/StartGameMenu';
import ResultGame from '../components/ResultGame/ResultGame';
import SprintGame from './SprintGame';
import LevelDifficult from '../components/LevelDifficult/LevelDifficult';
import './styles.css';

const Sprint = () => {
  const [gameState, setGameState] = useState('start');
  const [answersResults, setAnswersResults] = useState({ right: [], wrong: [] });
  const [result, setResult] = useState(null);
  const [level, setLevel] = useState(0);
  const resultComponent = (
    <ResultGame
      rightAnswers={answersResults.right}
      wrongAnswers={answersResults.wrong}
      restartGame={() => setGameState('game')}
      result={result}
    />
  );
  const gameComponent = (
    <SprintGame
      setGameState={setGameState}
      gameState={gameState}
      setResult={setResult}
      setAnswersResults={setAnswersResults}
    />
  );
  const startComponent = (
    <Grid style={{ textAlign: 'center' }} className="sprint-start-menu">
      <StartGameMenu
        title="Спринт"
        note='Суть проста: в игровом поле появляются английские слова, к которым предлагается перевод. Задача "спринтера" — определить, верен предложенный перевод или нет. И все это — на время!'
        startGame={() => setGameState('game')}
        colorText="#ff5370"
        colorTextButton="#fff"
        colorButtonBackground="#ff5370"
      />
      <LevelDifficult setLevel={setLevel} color="#ff5370" />
    </Grid>
  );
  return (
    <div className="sprint-wrap" style={{ backgroundImage: `url(https://i.imgur.com/7591jq9.jpg)` }}>
      <div className="sprint-inner">
        <SwitchTransition>
          <CSSTransition in={true} key={gameState} timeout={500} classNames="zoom">
            {gameState === 'start' ? startComponent : gameState === 'end' ? resultComponent : gameComponent}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};

export default Sprint;
