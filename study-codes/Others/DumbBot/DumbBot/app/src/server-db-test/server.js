const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers/universalController')(app);

app.get('/status', (req, res) => {
  res.send({ status: 'Running' });
});

app.listen(port, () => console.log(`DumbBot server started on port ${port}.`));
