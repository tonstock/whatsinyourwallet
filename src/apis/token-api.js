async function fetchData(address) {
  try {
    const url = `https://api.ethplorer.io/getAddressInfo/${address}?apiKey=freekey`
    const response = await fetch(url)
    const json = await response.json()
    const {ETH, tokens} = json
    
    const tokenList = []
    const ethToken = {
      id: 'Ethereum', 
      name: 'Ethereum', 
      balance: ETH.balance, 
      symbol: 'ETH', 
      image: 'eth.png', 
      rate: ETH.price.rate
    }
    tokenList.push(ethToken)
    
    tokens.forEach((token) => {
      const { tokenInfo, balance } = token
      const { price, name, symbol, image } = tokenInfo
      const { rate } = price || {}

      const imageurl = (typeof image === 'undefined') ? 
        'chuckecheese.png' : `https://ethplorer.io${image}`
      
      const cleanToken = {
        id: name, 
        name: name, 
        balance: balance, 
        image: imageurl, 
        symbol: symbol, 
        rate: rate,
      }
      tokenList.push(cleanToken)
    })
    return tokenList
  } catch (error) {
    console.log(error)
  }
}

export default fetchData;