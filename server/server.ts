import { Application } from "express";
import * as express from 'express';

const bodyParser = require('body-parser');
const axios = require('axios');

const app: Application = express();

app.use(bodyParser.json());

const cors = require('cors');

app.use(cors({origin: true}));

app.get('/proxy/activityfeed', async (req:any, res:any) => {
  console.log('Proxying request to activity feed');
  try {
    const tenantId = req.query.tenantId;
    const subscriptionId = req.query.subscriptionId;
    console.log('tenantId:', tenantId);
    console.log('subscriptionId:', subscriptionId);
    const response = await axios.get(`https://manage.office.com/api/v1.0/${tenantId}/activity/feed/${subscriptionId}`, {
      headers: {
        Authorization: `${req.headers.authorization}`,
      }
    });
    res.json(response.data);
    console.log('Activity feed response:', response.data);
  } catch (error) {
    res.status(500).send('Error retrieving activity feed');
  }
});
app.get('/proxy/services', async (req: any, res: any) => {
  console.log('Proxying request to services');
  try {
    const tenantId = req.query.tenantId;
    console.log('tenantId:', tenantId);
    console.log('Authorization:', req.headers.authorization);
    const response = await axios.get(`https://manage.office.com/api/v1.0/${tenantId}/ServiceComms/CurrentStatus`, {
      headers: {
        Authorization: `${req.headers.authorization}`,
      },
    });
    console.log('Services response:', response);
    res.json(response.data);
    console.log('Activity feed response:', response.data);
  } catch (error: any) {
    console.error('Error retrieving activity feed:', error.message); // Log the actual error
    res.status(error.status).send('Error retrieving services status'); // Send just the error message
  }
});


app.listen(3000, () => {
  console.log(`Proxy server running on http://localhost:3000`);
});
