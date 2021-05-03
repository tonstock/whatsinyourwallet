import React, { useState, /*useEffect*/ } from 'react';
import './App.css';
// import { json } from './testDB.js'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';

function App() {

  const [address, setAddress] = useState('');
  const [eth, setEth] = useState({});
  const [tokens, setTokens] = useState([]);

  // useEffect(() => {
  //   fetchData()
  // })
  
  const columns = [
    // { field: 'id', headerName: 'Column 1', width: 200 },
    { field: 'name', headerName: 'Token Name', width: 200 },
    { field: 'balance', headerName: 'Token Balance', width: 200 },
  ];

  async function fetchData() {
      try {
        const url = `https://api.ethplorer.io/getAddressInfo/${address}?apiKey=freekey`
        const response = await fetch(url)
        const json = await response.json()
        const {ETH, tokens} = json

        setEth({name: 'ETH', balance: ETH.balance})
        
        const tokenList = []
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
        <form onSubmit={handleSubmit}>
          <TextField id="outlined-basic" label="address" variant="outlined" onChange={handleChange} />
          <Button variant="outlined" type='submit'>Submit</Button>
        </form>
        <p>{eth.name} {address} {eth.balance}</p>
        <p>List of Tokens:</p>
        {/* {
          tokens.map((token, index) => {
              return <p key={index}>{token.name} {token.balance.toFixed(2)}</p>
          })
        } */}
        <DataGrid rows={tokens} columns={columns} autoHeight={true}/>
      </header>
    </div>
  );
}

export default App;