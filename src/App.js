import React, { useState, /*useEffect*/ } from 'react';
import './styles/App.css';
// import { json } from './testDB.js'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container, Avatar, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CryptoItem from './components/CryptoItem';
import { makeStyles } from '@material-ui/core/styles';
import fetchData from './apis/token-api';
import samJacksonURL from './constants';

function App() {

  const useStyles = makeStyles((theme) => ({
    mainInput: {
      width: '45ch',
    },
    submitButton: {
      size: 'small',
      marginLeft: '10px',
    },
    samjavatar: {
      marginTop: '10px',
      width: theme.spacing(30),
      height: theme.spacing(30),
      align: 'center'
    },
    tokenListHeader: {
      marginTop: '25px',
    }
  }));

  const [address, setAddress] = useState('');
  const [tokens, setTokens] = useState([]);

  const handleChange = (event) => {
    setAddress(event.target.value)
  }

  const handleSubmit = async (event) => {
    if (address.length !== 0) {
      const tokenList = await fetchData(address)
      setTokens(tokenList)
    }
    event.preventDefault()
  }

  const classes = useStyles();

  let tokensElements = []
  if (!tokens || !tokens.length) {
    tokensElements = (
      <Grid xs={8} item>
        <p>Please Search a Valid Eth Address</p>
        <p>Vitalk Address: 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B</p>
        <p>Manu Ginobli Address: 0x3d26505CAAA07F98E6f5524b155FadD5E4800A7c</p>
        <p>Peruggia Address: 0xf4b4a58974524e183c275f3c6ea895bc2368e738</p>
      </Grid>
    )
  } else {
    tokensElements = tokens.map((token, index) => {
      return <CryptoItem key={index} token={token}/>
    })
  }

  return (
    <div className="App">
        <Container align='center'>
            <Grid container spacing={2} justify='center'>
                <Grid item xs={8}>
                    <Avatar alt="Remy Sharp" className={classes.samjavatar} src={samJacksonURL}/>
                </Grid>
                <Grid item xs={8}>
                    <TextField id="standard" size='small' className={classes.mainInput} label="address" 
                      variant="outlined" onChange={handleChange}/>
                    <Button variant="outlined" size='large' className={classes.submitButton} onClick={handleSubmit}>Submit</Button>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant='h6' className={classes.tokenListHeader}>
                      Token List:
                    </Typography>
                </Grid>
                    {tokensElements}
            </Grid>
        </Container>
    </div>
  );
}

export default App;