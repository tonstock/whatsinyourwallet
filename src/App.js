import React, { useState, /*useEffect*/ } from 'react';
import './App.css';
// import { json } from './testDB.js'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container, Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CryptoItem from './CryptoItem';
import { makeStyles } from '@material-ui/core/styles';

function App() {

  const useStyles = makeStyles((theme) => ({
    mainInput: {
      width: '40ch',
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

  return (
    <div className="App">
        <Container align='center'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Avatar alt="Remy Sharp" className={classes.samjavatar} src='https://consequence.net/wp-content/uploads/2017/03/samuel-jackson-headshot_crop.jpg'/>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="standard" size='small' className={classes.mainInput} label="address" 
                      variant="outlined" onChange={handleChange}/>
                    <Button variant="outlined" size='large' className={classes.submitButton} onClick={handleSubmit}>Submit</Button>
                </Grid>
                {tokens.map((token, index) => {
                    return <CryptoItem key={index} token={token}/>
                })}
            </Grid>
        </Container>
    </div>
  );
}

export default App;