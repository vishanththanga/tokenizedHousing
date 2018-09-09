# tokenizedHousing
<b>Building Housing Tokens to Create a Real Time Stock Market for Real Estate</b>

Real Estate is an industry stuck in the past. Despite the enormous demand for residential real estate investing, we still live under conditions where if you want to invest, you have to be very rich. Consequently, the working class does not have access to investing and cannot diversify their portfolio. Moreover, tokenization makes it extremely easy for individuals to "short" residential properties, not allocating the market enough time to correct bubbles and deflationary periods. That is why The People's Estate is creating a system that is semi centralized to tokenize real estate and create the infrastructure for a real estate "stock market." Our protocols use the Stelllar Network, and its memo fields to have a publicly verifiable ledger for all transactions, while still maintaining AML and KYC compliant. The People's Estate is a team of individuals not much different than you working to decentralize real estate and give back power back to the people.  

<h3>API End Points:</h3>
<b>Create Account (Post)</b>
  /api/addAccount<br>
<b>Create Transcation (Post)</b>
  /api/addTrans<br>
<b>Create Tokenized Asset (Post)</b>
  /api/addHouse<br>
<b>Get A Certain Listing (Post)</b>
  /api/houseId<br>
<b>Get All Tokenized Listing (Get)</b>
  /api/houses<br>

<h3>Other Requirements</h3>
You need to have node.js installed with an instance of mySQL server running on the computer
You also need to have a .env file with the following things: 

MYSQL_HOST= <br>
MYSQL_USER= <br>
MYSQL_ROOT_PASSWORD= <br>
MYSQL_DATABASE= <br>
MYSQL_PORT= <br>
SERVER_PORT= <br>
BASE_ACCOUNT= <br>
ISSUING_SECRET= <br>

<h3>Notes</h3>
Only the index.html file in the public folder is functional when it comes to adding things to the databases and interacting with the databases, other files are for aesthetic and are not functional. They are more of mockups of what a future product may look like. Nevetheless, our future is bright and we are excited to work on bringing our vision to life. You do not want to miss out on The People's Estate.
