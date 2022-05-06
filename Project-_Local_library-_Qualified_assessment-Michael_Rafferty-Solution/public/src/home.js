/******************************************************************************
  Function: getTotalBooksCount
  Inputs:
  books: An array of books.

  Returns:
  It returns a _number_ that represents the number of book objects inside of the array.
*******************************************************************************/

function getTotalBooksCount(books)
{
	//Check for empty arguments and return null if there is an empty argument (is the argument falsy)
	if(!books) return null;

	return(books.length);
}

/******************************************************************************
  Function: getTotalAccountsCount
  Inputs:
  accounts: An array of account objects.

  Returns:
  It returns a _number_ that represents the number of account objects inside of the array.
*******************************************************************************/

function getTotalAccountsCount(accounts)
{
	//Check for empty arguments and return null if there is an empty argument (is the argument falsy)
	if(!accounts) return null;

	return(accounts.length);
}

/******************************************************************************
  Function: getBooksBorrowedCount
  Inputs:
  books: An array of books.

  Returns:
  It returns a _number_ that represents the number of books _that are currently checked out of the library.
  This number can be found by looking at the first transaction object in the `borrows` array of each book.
  If the transaction says the book has not been returned (i.e. `returned: false`),
  the book is currently being borrowed.
*******************************************************************************/

function getBooksBorrowedCount(books)
{
	//Check for empty arguments and return null if there is an empty argument (is the argument falsy)
	if(!books) return null;

	//initialize the accumulator countOfBorrows
	let countOfBorrows = 0;

	//loop through all of the individual books in the books array
	for(let i = 0; i < books.length; i++)
	{
    	let book = books[i];

		//loop through all of the individual borrows for the current book
		for(let j = 0; j < book.borrows.length; j++)
		{
			//if the book has not been returned
			if(!book.borrows[j].returned)
			{
        		countOfBorrows += 1;
			}
		}
    }
	return countOfBorrows;
}

/******************************************************************************
  Function: getMostCommonGenres
  Inputs:
  books: An array of books.

  Returns:
  It returns an array containing five objects or fewer that represents the most common occurring genres,
  ordered from most common to least.

  Each object in the returned array has two keys:

  - The `name` key which represents the name of the genre.
  - The `count` key which represents the number of times the genre occurs.

  Even if there is a tie, the array should only contain no more than five objects.

*******************************************************************************/

function getMostCommonGenres(books)
{
	//Check for empty arguments and return null if there is an empty argument (is the argument falsy)
	if(!books) return null;

	//initialize the return array
	let returnArray = [];

	//initialize array to capture genre counts
	const genreObjects = {};

	//This count genres
	books.forEach(function(book)
	{
  		genreObjects[book.genre]? genreObjects[book.genre]++ : genreObjects[book.genre]=1;
	});

  	//Initialize and array to use for sorting the genrea
	let sortableArray = [];
	for (var genre in genreObjects)
	{
		sortableArray.push([genre, genreObjects[genre]]);
	}

	sortableArray.sort(function(a, b)
	{
    	return b[1] - a[1];
	});

	//copy no more than five objects into the return array
	for (let i = 0; i < sortableArray.length; i++)
	{
		if (returnArray.length < 5)
		{
			const myNewObject = new Object;
			myNewObject["name"] = sortableArray[i][0];
			myNewObject["count"]  = sortableArray[i][1];
			returnArray.push(myNewObject);
		}
	}

	return returnArray;
}

/******************************************************************************
  Function: getMostPopularBooks
  Inputs:
  books: An array of books.

  Returns:
  It returns an array containing five objects or fewer that represents the most popular books in the library.
  Popularity is represented by the number of times a book has been borrowed.

  Each object in the returned array has two keys:

  - The `name` key which represents the title of the book.
  - The `count` key which represents the number of times the book has been borrowed.

  Even if there is a tie, the array should only contain no more than five objects.
*******************************************************************************/

function getMostPopularBooks(books)
{
	//Check for empty arguments and return null if there is an empty argument (is the argument falsy)
	if(!books) return null;

	//initialize the return array
	let returnArray = [];

	//initialize array to capture genre counts
	const titleObjects = {};

	//This count borrows
	books.forEach(function(book)
	{
  		titleObjects[book.title] = book.borrows.length;
	});

  	//Initialize and array to use for sorting the genrea
	let sortableArray = [];
	for (var title in titleObjects)
	{
		sortableArray.push([title, titleObjects[title]]);
	}

	sortableArray.sort(function(a, b)
	{
    	return b[1] - a[1];
	});

	//copy no more than five objects into the return array
	for (let i = 0; i < sortableArray.length; i++)
	{
		if (returnArray.length < 5)
		{
			const myNewObject = new Object;
			myNewObject["name"] = sortableArray[i][0];
			myNewObject["count"]  = sortableArray[i][1];
			returnArray.push(myNewObject);
		}
	}

	return returnArray;
}

/******************************************************************************
  Function: getMostPopularAuthors
  Inputs:
  books: An array of books.
  authors

  Returns:
It returns an array containing five objects or fewer that represents the most popular authors whose
books have been checked out the most. Popularity is represented by finding all of the books written
by the author and then adding up the number of times those books have been borrowed.

  Each object in the returned array has two keys:

  - The `name` key which represents the first and last name of the author.
  - The `count` key which represents the number of times the author's books have been borrowed.

  Even if there is a tie, the array should contain no more than five objects.
*******************************************************************************/

function getMostPopularAuthors(books, authors)
{
	//Check for empty arguments and return null if there is an empty argument (is the argument falsy)
	if(!books) return null;
	if(!authors) return null;

	//initialize the return array
	let returnArray = [];

	//create an empty copy of the authors array
	const myAuthorArray = [];

	//copy each objects from the authors array to the new authors array
	//and add a new property: countOfBooksBorrowed
	for (let i = 0; i < authors.length; i++)
	{
			const myNewObject = new Object;
			myNewObject["id"] = authors[i].id;
			myNewObject["name"] = authors[i].name;
			myNewObject["countOfBooksBorrowed"] = 0;
			myAuthorArray.push(myNewObject);
	}

	//loop through all books to get the numbers of borrowed by author
	for (let bookIndex = 0; bookIndex < books.length; bookIndex++)
	{
		//examine the current book
		let book = books[bookIndex];

		//find the correct author
		for (let j = 0; j < myAuthorArray.length; j++)
		{
			let myAuthor = myAuthorArray[j];
			if (myAuthor.id === book.authorId)
			{
				myAuthor.countOfBooksBorrowed = myAuthor.countOfBooksBorrowed + book.borrows.length
			}
		}
	}

	myAuthorArray.sort((authorA, authorB) => authorB.countOfBooksBorrowed - authorA.countOfBooksBorrowed);

	//copy no more than five objects into the return array
	for (let i = 0; i < myAuthorArray.length; i++)
	{
		if (returnArray.length < 5)
		{
			const myReturnObject = new Object;
			myReturnObject["name"] = myAuthorArray[i].name.first + " " + myAuthorArray[i].name.last;
			myReturnObject["count"]  = myAuthorArray[i].countOfBooksBorrowed;
			returnArray.push(myReturnObject);
		}
	}

	return returnArray;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
