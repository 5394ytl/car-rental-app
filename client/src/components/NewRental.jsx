import Product from './Product';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchase } from '../redux/MyPurchasesSlice';
import { newRental } from '../redux/RentalSlice';
import { useEffect } from 'react';
import { updatePackages } from '../redux/PackageSlice';
import { addPurchaseRental } from '../redux/PurchaseRentalSlice';

const NewRental = () => {
  const location = useLocation();
  const prod = location.state.prod
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector(state => state.userReducer.user.data)

  const setFrom = (event) => {
    setDateFrom(event.target.value);
  }
  const setTo = (event) => {
    setDateTo(event.target.value);
  }

  const sub = () => {
    const x = dateTo ? new Date(dateTo) : 0
    const y = dateFrom ? new Date(dateFrom) : 0
    const z = dateFrom && dateTo ? (x - y) / 86400000 : 0
    const d = z.toFixed();
    const h = (z - d) * 24;
    const t = d * prod.scorePerDay + h.toFixed() * prod.scorePerHour;
    return t;
  }
  const purchases = useSelector(state => state.MyPurchasesReducer.MyPurchases)
  useEffect(() => {
    dispatch(getPurchase(user.id));
  }, [dispatch]);
  const moveToActiveRental = async () => {
    const score = sub()
    let res;
    try {
      const rental = {
        "id": 0,
        "startDateTime": dateFrom,
        "endDateTime": dateTo,
        "usedScore": score,
        "productId": prod.id,
        "productName": prod.name
      }
      res = await dispatch(newRental(rental))
    }
    catch (error) {
      console.log(error);
    }
    // console.log("----------------------------------------");
    const activePurchases = purchases.filter(p => p.scoreBalance > 0)
    if (activePurchases.length > 0) {
      let s = score
      activePurchases.forEach(async p => {
        //  console.log("s", s) 
        if (s > 0 && p.scoreBalance >= 0) {
          // console.log("pack", p);
          // console.log("reduceScore", p.scoreBalance);
          if (s > p.scoreBalance) {
            s -= p.scoreBalance
            const updatePack = {
              "id": p.id,
              "scoreBalance": 0,
              "date": p.date,
              "userId": p.userId,
              "packageId": p.packageId
            }
            // console.log("updatePackages", updatePack);
            // await dispatch(updatePackages(updatePack))
            const newPurchaseRental = {
              Id: 0,
              RentalId: res.payload.id,
              PurchaseId: p.id,
              Scores: p.scoreBalance
            }
            // console.log("newPurchaseRental", newPurchaseRental);
            await dispatch(addPurchaseRental(newPurchaseRental))
          } else {
            // console.log("s=0");            
            //update the score in this purchase  to -> p.scoreBalance-s  
            const updatePack = {
              "id": p.id,
              "scoreBalance": (p.scoreBalance - s),
              "date": p.date,
              "userId": p.userId,
              "packageId": p.packageId
            }
            // console.log("updatePack", updatePack);
            const newPurchaseRental = {
              Id: 0,
              RentalId: res.payload.id,
              PurchaseId: p.id,
              Scores: p.scoreBalance - s
            }
             s = 0;
            // console.log("newPurchaseRental", newPurchaseRental);
            await dispatch(addPurchaseRental(newPurchaseRental))
            // await dispatch(updatePackages(updatePack))
          }
        }
      });
    }
    else {
      navigate('/package')
    }
    navigate('/ActiveRental');
  }

  return (<>
    <Product prod={prod} />
    <div>
      <fieldset class='fieldset'>
        <legend >Date And Time From:</legend>
        <input type='datetime-local' onChange={setFrom} class='date' />
      </fieldset>
    </div>
    <div>
      <fieldset class='fieldset'>
        <legend>Date And Time To:</legend>
        <input type='datetime-local' onChange={setTo} name='date' class='date' />
        <p></p>
      </fieldset>
    </div>
    <fieldset class='fieldset'>
      <legend>total:</legend>
      {sub()} scores
    </fieldset>
    <Button sx={{ color: '#284087' }} id='logIn' onClick={moveToActiveRental}>new rental</Button>
  </>
  );
}

export default NewRental 