/******************************************************************************
  Function: findAccountById
  Inputs:
  accounts: An array of account objects.
  id: A string ID of a single account object.

  Returns:
  the account object that has the matching ID
  if the accounts array is empty or the id string is empty, a null is returned
*******************************************************************************/

function findAccountById(accounts, id) {
  //Check for empty arguments and return null if there is an empty argument (is the argument falsy)
  if(!accounts) return null;
  if(!id) return null;

  //use the find method on the array to return the record with the matching id
  let found = accounts.find((account) => account.id === id);

  return found;
}

/******************************************************************************
  Function: sortAccountsByLastName
  Inputs:
  accounts: An array of account objects.

  Returns:
  a sorted array of accounts
  if the accounts array is empty or the id string is empty, a null is returned
*******************************************************************************/

function sortAccountsByLastName(accounts) {
  //Check for empty arguments and return null if there is an empty argument (is the argument falsy)
  if(!accounts) return null;

  // copy the array to a new array so the input array is not mutated
  const returnArray = [...accounts];

  //sort the array using the last name using a case insensitive comparison
  returnArray.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
    );
  return returnArray;
}

/******************************************************************************
  Function: getTotalNumberOfBorrows
  Inputs:
  account: A single account object
  books: An array of book objects

  Returns:
  returns a number that represents the number of times the account's ID appears in any book's `borrows` array.
  if the accounts array is empty or the id string is empty, a null is returned
*******************************************************************************/

function getTotalNumberOfBorrows(account, books) {
  //Check for empty arguments and return null if there is an empty argument (is the argument falsy)
  if(!account) return null;
  if(!books) return null;

  //Call a helper function which will return a new array of book objects
  //which will include a property with the specific number of borrows
  //by the specified account
  let accountBorrows = getBooksAccessedByAccount(account, books);
  let countOfBorrows = accountBorrows.reduce((total, book) => 
    {
      return total + book.numberOfAccountBorrows;
    }, 0);

  return countOfBorrows;
}

/******************************************************************************
  Function: getBooksPossessedByAccount
  Inputs:
  account: A single account object
  books: An array of book objects
  authors: An array of all author objects
  Returns:
  It returns an array of book objects, including author information,
  that represents all books _currently checked out_ by the given account.
  it's not just the book object; the author object is nested inside of it.
  *******************************************************************************/

function getBooksPossessedByAccount(account, books, authors)
{
	//Check for empty arguments and return null if there is an empty argument (is the argument falsy)
	if(!account) return null;
	if(!books) return null;
	if(!authors) return null;

	//initialize an empty array for the return Array
	let returnArray = [];
	
	//step through the books array 
  	books.forEach((book) => {
		//get the borrows array from the book
		let borrowed = book.borrows;
        
        //if the book is currently checked out by the selected account:
        //borrow.id === account.id && borrow.returned === false
        //put the book into our return array
   		if (borrowed.find((borrow) => borrow.id === account.id && borrow.returned === false)) { returnArray.push(book); } 
   	});

	//now we need to embed the author infomation into the book object for all of the books in our return array
	//walk through each book in our return array and embed the proper author object into the book object
  	returnArray.forEach((book) => { let author = authors.find((author) => author.id === book.authorId); book.author = author;})
  	
  	//return our array of books with embedded author information
	return returnArray; 
}

/******************************************************************************
  Helper Function: getBooksAccessedByAccount
  The helper function is called by the getTotalNumberOfBorrows functioon
  Inputs:
  account: A single account object
  books: An array of book objects

  Returns:
  returns a an array of books that have been accessed by the specified account
  the arrayObjects have an additional object: the borrows by the specified account
  if the accounts array is empty or the id string is empty, a null is returned
*******************************************************************************/

function getBooksAccessedByAccount(account, books)
{
	//Check for empty arguments and return null if there is an empty argument (is the argument falsy)
	if(!account) return null;
	if(!books) return null;

	//initialize an empty array for the return Array
	let returnArray = [];
	
	//step through the books array 
  	books.forEach((book) => {
		//get the borrows array from the book
		let borrowed = book.borrows;
        
        //if the book has been accessed out by the selected account:
        //borrow.id === account.id
        //put the book into our return array
   		if (borrowed.find((borrow) => borrow.id === account.id)) {
        returnArray.push(book);
      } 
   	});
  
  returnArray.forEach((book) => {
    let accountBorrows = book.borrows.filter((accountBorrow) => accountBorrow.id === account.id);             book["numberOfAccountBorrows"] = accountBorrows.length;
  })

  	//return our array of books with embedded author information
	return returnArray; 
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
