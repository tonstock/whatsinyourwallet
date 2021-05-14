import React, { useState, /*useEffect*/ } from 'react';
import './App.css';
// import { json } from './testDB.js'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container, Avatar, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CryptoItem from './CryptoItem';
import { makeStyles } from '@material-ui/core/styles';

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

  async function fetchData() {
      try {
        const url = `https://api.ethplorer.io/getAddressInfo/${address}?apiKey=freekey`
        const response = await fetch(url)
        const json = await response.json()
        const {ETH, tokens} = json
        
        const tokenList = []
        tokenList.push({id: ETH, name: 'ETH', balance: ETH.balance})
        tokens.forEach((token) => {
          const { tokenInfo, balance} = token
          const { name } = tokenInfo
          tokenList.push({id: name, name: name, balance: balance})
        })
        setTokens(tokenList)
      } catch (error) {
        console.log(error)
      }
  }

  const handleChange = (event) => {
    setAddress(event.target.value)
  }

  const handleSubmit = (event) => {
    fetchData()
    event.preventDefault()
  }

  const classes = useStyles();

  let tokensElements = []
  if (!tokens.length) {
    tokensElements = (
      <Grid xs={8} item>
        <p>Please Search a Valid Eth Address</p>
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
                    <Avatar alt="Remy Sharp" className={classes.samjavatar} src='https://consequence.net/wp-content/uploads/2017/03/samuel-jackson-headshot_crop.jpg'/>
                </Grid>
                <Grid item xs={8}>
                    <TextField id="standard" size='small' className={classes.mainInput} label="address" 
                      variant="outlined" onChange={handleChange}/>
                    <Button variant="outlined" size='large' className={classes.submitButton} onClick={handleSubmit}>Submit</Button>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant='h6' className={classes.tokenListHeader}>Token List:</Typography>
                </Grid>
                    {tokensElements}
            </Grid>
        </Container>
    </div>
  );
}

export default App;