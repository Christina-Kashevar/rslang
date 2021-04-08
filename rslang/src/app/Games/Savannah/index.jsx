import styles from './Savannah.module.css';
import urls from '../../../constants/urls';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SavannahQuiz from './SavannahQuiz/SavannahQuiz';
import Loading from '../../../components/partials/Loading';
import StartGameMenu from '../components/StartGameMenu/StartGameMenu';
import ResultGame from '../components/ResultGame/ResultGame';
import LevelDifficult from '../components/LevelDifficult/LevelDifficult';
import { currentDataForGames } from '../../Book/bookSlice';
import {
  fetchWordsForQuiz,
  selectTimer,
  selectLoading,
  selectStart,
  selectStatistics,
  nextRound,
  incrementTimer,
  selectRightAnswers,
  selectWrongAnswers,
  restartGame,
  selectResult,
  startGame,
  selectGuardAllowed,
  timeFinished,
  resetData,
} from './savannahSlice';

export default function Savannah() {
  const dispatch = useDispatch();
  const TIMER_LIMIT = 7;

  const timer = useSelector(selectTimer);
  const start = useSelector(selectStart);
  const statistics = useSelector(selectStatistics);

  const rightAnswers = useSelector(selectRightAnswers);
  const wrongAnswers = useSelector(selectWrongAnswers);
  const result = useSelector(selectResult);
  const guardAllowed = useSelector(selectGuardAllowed);
  const loading = useSelector(selectLoading);
  const haveDataFromBook = Object.keys(useSelector(currentDataForGames)).length;
  let history = useHistory();

  useEffect(() => {
    if (start) {
      (async () => {
        await dispatch(fetchWordsForQuiz(urls.words.all));
      })();
    }

    return () => {
      let currentPath = history.location.pathname.split('/');
      currentPath = currentPath[currentPath.length - 1];
      if (currentPath !== 'savannah') {
        dispatch(resetData());
      }
    };
  }, [start, dispatch, history]);

  useEffect(() => {
    if (start) {
      const intervalIdTimer = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);

      return () => clearInterval(intervalIdTimer);
    }
  }, [start, dispatch]);

  useEffect(() => {
    if (timer >= TIMER_LIMIT && guardAllowed) {
      dispatch(timeFinished());
      dispatch(nextRound());
    }
  }, [timer, dispatch, guardAllowed]);

  return (
    <div
      className={styles.savannahBackground}
      style={{ backgroundImage: `url(https://searchthisweb.com/wallpaper/african-savanna_2880x1800_y526q.jpg)` }}
    >
      <div className={styles.savannahWrapper}>
        <div className={styles.savannah}>
          {start ? (
            loading ? (
              <Loading />
            ) : (
              <SavannahQuiz />
            )
          ) : statistics ? (
            <ResultGame
              rightAnswers={rightAnswers}
              wrongAnswers={wrongAnswers}
              restartGame={() => dispatch(restartGame())}
              result={result}
            />
          ) : (
            <div style={{ textAlign: 'center' }}>
              <StartGameMenu
                title="Саванна"
                note="Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь."
                startGame={() => dispatch(startGame())}
                colorText="#f9f53e"
                colorTextButton="rgba(0, 0, 0, 0.87)"
                colorButtonBackground="#f9f53e"
              />
              {haveDataFromBook ? '' : <LevelDifficult color="#f9f53e" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
