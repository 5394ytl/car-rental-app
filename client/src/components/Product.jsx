import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Product = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
  <Button onClick={handleClickOpen} sx={{ minWidth: 312, minHeight: 400, padding: 0, border: '0px' }}>
        <Card sx={{ minWidth: 280, minHeight: 400, padding: 2, border: '0px' }}>
          
          <img src={`data:image/jpg;base64,${props?.prod?.logo}`} alt="logoCar" id='card' />
          <CardMedia
            component="img"
            alt="Car"
            height="140"
            image={`data:image/jpg;base64,${props?.prod?.image}`}
            sx={{ maxHeight: 500, maxWidth: 280, marginLeft: 2 }}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div" color='#284087' id='package' >
              {props.prod.name}
            </Typography>
            <Typography variant="body2" id="p" >
              score for day:  {props.prod.scorePerDay}<br />
              score for time: {props.prod.scorePerHour}
            </Typography>
          </CardContent>
        </Card>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Card sx={{ minWidth: 400, padding: 2, border: '0px white solid', boxShadow: 'none' }} align='center'>
            <img src={props.prod.logo} alt="logo" width={80} id='card' />
            <CardMedia
              component="img"
              alt="Car"
              height="140"
              image={props.prod.image}
              sx={{ maxHeight: 500, maxWidth: 280, marginLeft: 2 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h3" component="div" color='#284087' id='package' align='center'>
                {props.prod.name}
              </Typography>
              <Typography variant="body2" id="p" align='center'>
                score for day:  {props.prod.scoreForDay}<br />
                score for time: {props.prod.scoreForTime}
              </Typography>
            </CardContent>
          </Card>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
export default Product
