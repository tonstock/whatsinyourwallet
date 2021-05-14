import {Typography, CardMedia, CardContent, Card} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

function CryptoItem({token}) {
  
  const {name, balance} = token;

  return (
      <Grid xs={8} item>
        <Card>
          <CardMedia
            image='https://source.unsplash.com/random'
            title='Image Title'
          />
          <CardContent>
            <Typography gutterBottom variant='h5'>
              {name}
            </Typography>
            <Typography>
              {balance}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
  )
}

export default CryptoItem;