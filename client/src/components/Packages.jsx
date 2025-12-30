import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import { Box, IconButton } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {  useNavigate } from 'react-router-dom';
import {
  GaugeContainer,
  useGaugeState,
} from '@mui/x-charts/Gauge';
import { Gauge, gaugeClasses } from '@mui/x-charts';
import { getPackages } from '../redux/PackageSlice';
import { BuyPackage } from '../redux/MyPurchasesSlice'

const Packages = () => {
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();
  const navigate = useNavigate();
  const packages = useSelector(state => state.packageReducer.packages)
  const user = useSelector(state => state.userReducer.user)

  useEffect(() => {
    dispatch(getPackages());
  }, [dispatch]);

  const addFunc = (newCheck) => {
    setCheck(newCheck)
  }
  const [check, setCheck] = useState({})
  const toPurchase = async () => {
    if (check.id) {
      console.log(user);
      if (!user) {
        navigate('/ProtectedRoute')
      }
      else {
        const purchase = {
          ScoreBalance: check.amountScores,
          date: new Date(),
          userId: user.data.id,
          packageId: check.id
        }

        console.log("purchase", purchase)
        const response = await dispatch1(BuyPackage(purchase)).unwrap();
        console.log("response", response);
        switch (response) {
          case 201:
            navigate('/ActiveRental');
            break;
          default:
            alert('We are sorry, The purchase is not success, Please try again')
            navigate('/Package');
        }
      }
    }
    else {
      alert("you dont choosen package")
    }
  }
  function GaugePointer() {
    const { valueAngle, outerRadius, cx, cy } = useGaugeState();

    if (valueAngle === null) {
      return null;
    }

    const target = {
      x: cx + outerRadius * Math.sin(valueAngle),
      y: cy - outerRadius * Math.cos(valueAngle),
    };
    return (
      <g>
        <circle cx={cx} cy={cy} r={5} fill="green" />
        <path
          d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
          stroke="green"
          strokeWidth={3}
        />
      </g>
    );
  }

  function GaugePointer1() {
    const { valueAngle, outerRadius, cx, cy } = useGaugeState();

    if (valueAngle === null) {
      return null;
    }

    const target = {
      x: cx + outerRadius * Math.sin(valueAngle),
      y: cy - outerRadius * Math.cos(valueAngle),
    };
    return (
      <g>
        <fill color="red" />
        <circle cx={cx} cy={cy} r={3} fill="rgb(138, 138, 138)" />
        <path
          d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
          stroke="rgb(138, 138, 138)"
          strokeWidth={1}
        />
      </g>
    );
  }

  return (
    <>
      <Box
        sx={{ display: 'grid', gridTemplateColumns: { sm: '3.5fr 3fr 2.5fr' }, gap: 2, marginTop: 7 }}>
        {packages.map((user, index) =>
          <Card sx={{ minWidth: 290, maxHeight: 310, paddingTop: 2, paddingBottom: 4, placeItems: 'center' }} key={index}>
            {check.id === user.id ?
              (<GaugeContainer
                width={200}
                height={140}
                startAngle={-90}
                endAngle={90}
                value={user.size}
              >
                <Gauge
                  width={200}
                  height={140}
                  startAngle={-90}
                  endAngle={90}
                  value={user.size}
                  sx={(theme) => ({
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 0,
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                      fill: '#284087',
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                      fill: theme.palette.text.disabled,
                    },
                  })}
                />
                (<GaugePointer />)
              </GaugeContainer>) : (<GaugeContainer
                width={200}
                height={140}
                startAngle={-90}
                endAngle={90}
                value={0}
              >
                <Gauge
                  width={200}
                  height={140}
                  startAngle={-90}
                  endAngle={90}
                />
                (<GaugePointer1 />)
              </GaugeContainer>)}
            <CardContent>
              <Typography gutterBottom variant="h4" component="div" color='#284087' id='package'>
                {user.description}
              </Typography>
              <Typography variant="body2" id="p" >
                score: {user.amountScores}<br />
                price: {user.price}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => addFunc(user)}
                // onMouseDown={() => addFunc(user)}
                edge="end"
                size="small"
              >
                {check.id === user.id ? (
                  <CardMembershipIcon sx={{ fontSize: 50, color: '#4b9e6c' }} />
                ) : (
                  <AddShoppingCart sx={{ fontSize: 50, color: '#284087', left: 0 }} />
                )}
              </IconButton>
            </CardActions>
          </Card>
        )}
      </Box>
      <Button sx={{ color: '#284087' }} id='logIn' onClick={toPurchase} >purchase</Button>

    </>
  );
}

export default Packages