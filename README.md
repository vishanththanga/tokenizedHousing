# tokenizedHousing
<b>Building Housing Tokens to Create a Real Time Stock Market for Real Estate</b>

Real Estate is the one of the few industries that are still stuck in the past. We still live in a place where if you want to invest in Real Estate, you have to be very rich, meaning that the poorest people of the soceity cannot have access to it as an investment. Furthermore, people are not able to derversify their investments, or easily short real estate, meaning the market forces are not fast enough when it comes to correcting bubbles and deflationary periods. That is why we are trying to create a system that is semi centralized to tokenize real estate and create the infastructure for stock markets for real estate to exist. We are doing this by using the Stelllar Network, and its memo fields to have a publicly verifiable ledger for all transactions, and also still be AML and KYC compliant. 

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
Only the index.html file in the public folder is functional when it comes to adding things to the databases and interacting with teh databases, other files are for aesthetic and are not functional. They are more of mockups of what a future product may look like.
