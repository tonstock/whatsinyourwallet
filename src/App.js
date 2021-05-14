import React, { useState, /*useEffect*/ } from 'react';
import './App.css';
// import { json } from './testDB.js'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CryptoItem from './CryptoItem';

function App() {

  const [address, setAddress] = useState('');
  // const [eth, setEth] = useState({});
  const [tokens, setTokens] = useState([]);

  async function fetchData() {
      try {
        const url = `https://api.ethplorer.io/getAddressInfo/${address}?apiKey=freekey`
        const response = await fetch(url)
        const json = await response.json()
        const {ETH, tokens} = json

        // setEth({id: ETH, name: 'ETH', balance: ETH.balance})
        
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

  return (
    <div className="App">
      <header className="App-header">
        <Container maxWdith='sm'>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <TextField id="outlined-basic" label="address" variant="outlined" onChange={handleChange} /><br></br>
              <Button variant="outlined" type='submit'>Submit</Button><br></br>
            </form>
          </Grid>
            <div>
              <Grid container spacing={4} justify='center'>
                  {tokens.map((token, index) => {
                    return <CryptoItem key={index} token={token}/>
                  })}
              </Grid>
            </div>

        </Grid>
        </Container>
      </header>
    </div>
  );
}

export default App;