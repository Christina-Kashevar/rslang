import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Box, Link } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import Loading from '../../../components/partials/Loading';

import Page from './Page';
import useStyles from './style';

import { useDispatch, useSelector } from 'react-redux';
import { page, setPage } from '../bookSlice';

const storageInfo = localStorage.getItem('rslang20') ? JSON.parse(localStorage.getItem('rslang20')) : { page: 0, group: 0 };

export default function Section(props) {
  const group = props?.match?.params?.group  || 0;
  const [pageNum, setPageNum] = useState(useSelector(page) || 1);
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState(null);
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleChange = (event, value) => {
    setLoading(true);
    setPageNum(value);
    storageInfo.page = value;
    localStorage.setItem('rslang20', JSON.stringify(storageInfo));
    dispatch(setPage({pageNum: value}))
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
      .get(`https://react-rslang.herokuapp.com/words?group=${group}&page=${pageNum - 1}`)
      .then((response) => {
        setWords(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    };

    fetchData();
  },[group, pageNum])


  return (
    <Grid>
      <Container className={classes.bookWrapper}>
        { (loading) ? <Loading /> : <Page words={words} /> }
        <Pagination
         count={30}
         variant="outlined"
         color="primary"
         size="large"
         page={pageNum}
         onChange={handleChange}
         showFirstButton
         showLastButton
         className={classes.pagination}
        />
        <Box className={classes.linkwrapper}>
          <Link href="#/games/savannah" underline='none' className={classes.link}> Саванна </Link>
          <Link href="#/games/audiocall" underline='none' className={classes.link}> Аудиовызов </Link>
          <Link href="#/games/sprint" underline='none' className={classes.link}> Спринт </Link>
          <Link href="#/games/ourgame" underline='none' className={classes.link}> Своя игра </Link>
        </Box>
      </Container>
    </Grid>
  );
}