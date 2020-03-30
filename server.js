/*express is just a library that
allows us to build an API server easily*/
const express = require('express');
const enforce = require('express-sslify');
const cors = require('cors');
const path = require('path');
/*bundled in any node project
it's native module,it allows us to dynamically build
 when we call it from our current directory to where we're actually trying to go*/
const compression = require('compression');
if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
/*we can use this line because we require('dotenv')*/
/*it gives us back the stripe object that we can finally use to make charges*/

const app = express();
const port = process.env.PORT || 5000;
/*when you deploy to heroku,it sets up the process PORT for you*/

app.use(express.json());
app.use(express.urlencoded({extended:true}))
/*to make sure that url doesn't contain spaces,symbols*/
app.use(cors());
/*Cross-origin resource sharing, to make it possible
to make port-3000 of client to communicate to port-5000 of server*/
if(process.env.NODE_ENV == 'production'){
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname,'client/build')));
  /*to serve static files*/
  /*__dirname is part of node.js which tells us what directory we're currently in*/
  app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'client/build','index.html'))
  });/* '*' for any url user hits*/
}

app.listen(port,error => {
  if(error) throw error;
  console.log('Server running on port '+port);
});

app.get('/service-worker.js', (req,res) => {
  res.sendFile(path.resolve(__dirname,'..','build','service-worker.js'));
});/*.. mean to go from client to build folder to find service-worker.js*/

app.post('/payment',(req,res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };
  
  stripe.charges.create(body,(stripeErr,stripeRes) => {
    if(stripeErr){
      res.status(500).send({error:stripeErr});
    }else{
      res.status(200).send({success: stripeRes});
    }
  })
})
