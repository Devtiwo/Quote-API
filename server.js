const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote });
});

app.get('/api/quotes', (req, res, next) => {
  const queryPerson = req.query.person;
  const requestedQuote = [];
  if (!queryPerson) {
    res.send({ quotes: quotes });
  } else {
    quotes.forEach(item => {
      if ( queryPerson === item.person) {
        requestedQuote.push(item);
      }    
    });
    res.send({ quotes: requestedQuote });
  }
});

app.post('/api/quotes', (req, res, next) => {
  const newQuote = req.query.quote;
  const newPerson = req.query.person;
  const responseBody = {
    quote: {
      quote: newQuote,
      person: newPerson,
    }
  }
  if (newQuote && newPerson) {
    quotes.push( { 
        quote: newQuote, 
        person: newPerson 
    } );
    res.send(responseBody);
  } else {
    res.status(400).send('something went wrong');
  }
});

app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});