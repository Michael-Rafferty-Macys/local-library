/******************************************************************************
  Function: findAuthorById
  Inputs:
  authors: An array of all author objects
  id: An integer ID of a single author object.
  Returns:
  It returns the author object that has the matching ID.
*******************************************************************************/

function findAuthorById(authors, id) {
  //Check for empty arguments and return null if there is an empty argument (is the argument falsy)
  if(!authors) return null;
  if(!id) return null;

  //use the find method on the array to return the record with the matching id
  let found = authors.find((author) => author.id === id);

  return found;
}

/******************************************************************************
  Function: findBookById
  Inputs:
  books: An array of book objects.
  id: A string ID of a single book object.
  Returns:
  It returns the book object that has the matching ID.
*******************************************************************************/

function findBookById(books, id) {
  //Check for empty arguments and return null if there is an empty argument (is the argument falsy)
  if(!books) return null;
  if(!id) return null;

  //use the find method on the array to return the record with the matching id
  let found = books.find((book) => book.id === id);

  return found;
}

/******************************************************************************
  Function: partitionBooksByBorrowedStatus
  Inputs:
  books: An array of book objects.
  Returns:
  It returns an array with two arrays inside of it.
  All of the inputted books are present in either the first or second array.
*******************************************************************************/

function partitionBooksByBorrowedStatus(books) {
  //Check for empty arguments and return null if there is an empty argument (is the argument falsy)
  if(!books) return null;

  //define an array for the return data
  let returnArray = [];

  const reformattedArray = books.map (book => {
  	const reformattedObject = {};
  	
  	reformattedObject.id = book.id;
  	reformattedObject.title = book.title;
  	reformattedObject.genre = book.genre;
  	reformattedObject.authorId = book.authorId;
  	reformattedObject.borrows = book.borrows;
  	reformattedObject.returned = book.borrows[0].returned;
    return reformattedObject;
  });

  const returnedBooks = reformattedArray.filter(book => book.returned);
  const borrowedBooks = reformattedArray.filter(book => !book.returned);
  
  returnArray.push(borrowedBooks);
  returnArray.push(returnedBooks);
  return returnArray;
}

/******************************************************************************
  Function: getBorrowersForBook
  Inputs:
  book: An single book objects.
  accounts: An array of all account objects.
  Returns:
  It should return an array of ten or fewer account objects that represents the
  accounts given by the IDs in the provided book's `borrows` array.
  However, each account object should include the `returned` entry from
  the corresponding transaction object in the `borrows` array.
*******************************************************************************/

function getBorrowersForBook(book, accounts)
{

	//Check for empty arguments and return null if there is an empty argument (is the argument falsy)
	if(!accounts) return null;
	if(!book) return null;

	//create an empty array for the return value
	let returnValue = [];

	//loop through all of the individual accounts in the accounts array
	for(let accountIndex = 0; accountIndex < accounts.length; accountIndex++)
	{
		const account = accounts[accountIndex];

		//loop through all of the account objects for the specified book looking for the current acount
		for(let j = 0; j < book.borrows.length; j++)
		{

			//if the borrower id matches the account id, increment the counter

			if(book.borrows[j].id === account.id)
			{
				if (returnValue.length < 10)
				{
					//Define my new return object in the same order
					//specified in the specification
					const myReturnObject = new Object;
					myReturnObject["id"] = account.id,
					myReturnObject["returned"] = book.borrows[j].returned,
					myReturnObject["picture"] = account.picture,
					myReturnObject["age"] = account.age,
					myReturnObject["name"] = account.name,
					myReturnObject["company"] = account.company,
					myReturnObject["email"] = account.email,
					myReturnObject["registered"] = account.registered;

					//Push the new object onto the return array of objects
					returnValue.push(myReturnObject);
				}
			}
		}
	}
  	return returnValue;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
