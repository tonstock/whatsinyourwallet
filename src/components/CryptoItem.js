import {Typography, CardContent, Card} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';


function CryptoItem({token}) {
  
  let {name, balance, image, symbol} = token;

  return (
      <Grid xs={8} item>
        <Card>
          <CardContent>
            <Typography gutterBottom variant='h5'>
              {name}
            </Typography>
            <Typography>
              {symbol}
            </Typography>
            <Typography>
              {balance}
            </Typography>
            <Typography>
              {image}
            </Typography>
            <Avatar 
              alt="Remy Sharp" 
              src={image}
            />
          </CardContent>
        </Card>
      </Grid>
  )
}

export default CryptoItem;