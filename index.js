'use strict';

const getNewQuote = () => {
  return axios({
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
    method: 'POST',
    headers: { 
      "X-Mashape-Key": "b6tCZGODOTmshRX3SGwKX39eANfup1NqESSjsnPp9aB0mxbvHF", 
      "Content-Type": "application/x-www-form-urlencoded", 
      "Accept": "application/json"
    } 
  })
  .then((response) => {
    const data = response.data
    return handleQuoteResponse(data);
  })
  .then((quote) => {
    return getYodaQuote(quote);
  })
  .then((yodaResponse) => {
    return handleYodaResponse(yodaResponse);
  })
  .catch(handleError);
};

const getYodaQuote = (quote) => {
  return axios({
    url: `https://yoda.p.mashape.com/yoda?sentence=${quote}`,
    method: 'GET',
    headers: {
      "X-Mashape-Key": "b6tCZGODOTmshRX3SGwKX39eANfup1NqESSjsnPp9aB0mxbvHF",
      "Accept": "text/plain"
    }
  })
  .then((response) => {
    const yodaQuote = response.data;
    return yodaQuote;
  })
};

const handleQuoteResponse = (data) => {
  const quote = data.quote;
  const author = data.author;
  const quoteText = document.getElementById('quoteText');
  const authorText = document.getElementById('author');
  quoteText.innerHTML = '<h1>"' + quote + '"</h1>';
  authorText.innerHTML = '<p>- ' + author + '</p>';
  return data.quote;
};

const handleYodaResponse = (quote) => {
  const yodaQuoteText = document.getElementById('yodaQuoteText');
  yodaQuoteText.innerHTML = '<h1>"' + quote + '"</h1>';
};

const handleError = (error) => {
  console.error('Error: ', error);
};