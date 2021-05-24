import {Typography, CardContent, Card} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function CryptoItem({token}) {

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    columnLayout: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1
    },
    tokenImage : {
      display: 'flex',
      justifyContent: "flex-start",
    },
    tokenName : {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: "flex-start",
    },
    tokenAmounts : {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: "flex-end",
      flexGrow: 1
    }    
  }));

  const classes = useStyles();
  // const classes = {}
  
  const {name, balance, image, symbol, rate} = token;

  return (
      <Grid xs={8} item>
        <Card className={classes.root}>
          <CardContent className={classes.columnLayout}>
            <div className={classes.tokenImage}>
              <Avatar 
                  src={image}
              />
            </div>
            <div className={classes.tokenName}>
              <Typography>
                {name}
              </Typography>
              <Typography>
                {symbol}
              </Typography>
            </div>
            <div className={classes.tokenAmounts}>
              <Typography>
                {balance}
              </Typography>
              <Typography>
                {rate}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
  )
}

export default CryptoItem;