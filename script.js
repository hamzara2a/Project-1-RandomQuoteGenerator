const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");




let quoteData = []

// API call for quotes----------------------------
async function getQuotes() {
    const apiURL = "https://type.fit/api/quotes"
    try {
        
        const response = await fetch(apiURL);
        const quoteData = await response.json();
        const quote = quoteData[Math.floor(Math.random() * quoteData.length)];

        //check if author name is present----------------------------
        if (!quote.author) {
            quoteAuthor.textContent = "Unknown"
        } else {
            quoteAuthor.textContent = quote.author
        }

        //check quote length to determine styling----------------------------
        if (quote.text.length > 80) {
            quoteText.classList.add("long-quote")
        } else {
            quoteText.classList.remove("long-quote")
        }
        quoteText.textContent = quote.text
        
    } catch(err) {
        console.log("oops, something went wrong :( ")
    }
}
//Tweet the Quote----------------------------
function tweetQuote() {
    const tweetUrl = `https://twitter.com/intent/tweet?text${quoteText.textContent} -${quoteAuthor.textContent}`
    window.open(tweetUrl, "_blank")


}



//event listeners----------------------------
newQuoteBtn.addEventListener("click", getQuotes)
twitterBtn.addEventListener("click", tweetQuote)

getQuotes()


