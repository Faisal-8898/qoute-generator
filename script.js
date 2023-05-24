const quoteContainer = document.getElementById("qoute-container");
const quoteText = document.getElementById("quote1");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const facebookBtn = document.getElementById("facebook");
const copyBtn = document.getElementById("copyb");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById('loader');

let apiQuotes = [];
//show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

//hideloading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}

//show new quote
function newQuote() {
    loading();
    
  // pick a raandom quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 120) {
    quoteText.classList.add("long-qoute");
  } else {
    quoteText.classList.remove("long-qoute");
  }
  quoteText.textContent = quote.text;
  complete();
}

//Get Qoutes From API
async function getQuotes() {
    loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
    //catch Error
  }
}

//tweet qoute
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl,'_blank');
}

function shareQuoteOnFacebook() {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(quoteText.textContent + ' - ' + authorText.textContent)}`;
    window.open(facebookUrl, '_blank');
  }

  function copyText() {
    const textToCopy = `${quoteText.textContent} - ${authorText.textContent}`;

    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
  
    // Select and copy the text
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
  
    // Clean up
    document.body.removeChild(textarea);
  }

  newQuoteBtn.addEventListener('click',newQuote);
  twitterBtn.addEventListener('click',tweetQuote);
  facebookBtn.addEventListener('click',shareQuoteOnFacebook);
  copyBtn.addEventListener('click',copyText);



getQuotes();


