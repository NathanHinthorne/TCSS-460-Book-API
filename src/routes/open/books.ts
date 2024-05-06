/*

This file can be split into 3 pieces: 

1. Setup
    a. Import necessary things
    b. Define a new router

2. Middlewear functions
    a. These are functions that have access to 
        the request object (req), the response object (res), 
        and the next middleware function in the application’s 
        request-response cycle. 
    b. They can perform tasks like input validation, logging, 
        or modifying the request/response objects.

3. Endpoint handlers
    a. Define endpoints using get/put/post/delete.
    b. These will respond to HTTP requests made to specific paths.

*/



/*
==============================================================
1. Setup
    a. Import necessary things
    b. Define a new router
==============================================================
*/

//express is the framework we're going to use to handle requests
import express, { NextFunction, Request, Response, Router } from 'express';
//Access the connection to Postgres Database
import { pool, validationFunctions } from '../../core/utilities';

const bookRouter: Router = express.Router();



/*
==============================================================
2. Middlewear functions
    a. These are functions that have access to 
        the request object (req), the response object (res), 
        and the next middleware function in the application’s 
        request-response cycle. 
    b. They can perform tasks like input validation, logging, 
        or modifying the request/response objects.
==============================================================
*/






/*
==============================================================
3. Endpoint handlers
    a. Define endpoints using get/put/post/delete.
    b. These will respond to HTTP requests made to specific paths.
==============================================================
*/

/*
NOTE: We might want to return book objects instead of
      strings which describe the books.
      This would be more useful for the front end
      since we wouldn't have to spend time parsing the strings.

doing this would look like:

 @apiSuccess {Object} book The book
 @apiSuccess {String} book.isbn13 The ISBN of the book
 @apiSuccess {String} book.authors The authors of the book
 @apiSuccess {String} book.publication_year The year the book was published
 @apiSuccess {String} book.original_title The original title of the book
 @apiSuccess {String} book.title The title of the book
 @apiSuccess {String} book.rating_avg The average rating of the book
 @apiSuccess {String} book.rating_count The number of ratings the book has
 @apiSuccess {String} book.rating_1_star The number of 1 star ratings the book has
 @apiSuccess {String} book.rating_2_star The number of 2 star ratings the book has
 @apiSuccess {String} book.rating_3_star The number of 3 star ratings the book has
 @apiSuccess {String} book.rating_4_star The number of 4 star ratings the book has
 @apiSuccess {String} book.rating_5_star The number of 5 star ratings the book has
 @apiSuccess {String} book.image_url The URL of the image of the book
 @apiSuccess {String} book.image_small_url The URL of the small image of the book

as you can see above, this is a lot of lines of code to write
*/


// ---------------- GET ----------------

/**
 * NOTE: This is a required endpoint
 * 
 * @api {get} /books Get all books
 * 
 * @apiDescription Get all books in the database
 * 
 * @apiName GetAllBooks
 * @apiGroup User
 * 
 * @apiSuccess {String[]} bookList List of all the books as the following string: 
 *       "Title: {title}, Author: {author}, ISBN: {isbn}"             
 * @apiSuccessExample {json} Success-Response:
 * { "bookList":  "Title: Animal Farm, Author: George Orwell, ISBN: 9780451526342" }
 * 
 * @apiError (404: Books Not Found) No books were found in the database
 */


/** 
 * NOTE: This is a required endpoint
 * @api {get} /books/:isbn Get specific book by ISBN
 * 
 * @apiDescription Get a specific book by ISBN
 * 
 * @apiName GetByISBN
 * @apiGroup User
 * 
 * @apiParam {String} The ISBN paired with a given book
 * 
 * @apiSuccess {String} book The book as the following string:
 *      "Title: {title}, Author: {author}, ISBN: {isbn}"
 * @apiSuccessExample {String} Success-Response:
 * "book":  "Title: Animal Farm, Author: George Orwell, ISBN: 9780451526342"
 * 
 * @apiError (404: Book Not Found) The book with the given ISBN was not found
*/

/**
 * NOTE: This is a required endpoint
 * @api {get} /books?author=:author Get books by an author
 * 
 * @apiDescription Get books by a given author
 * 
 * @apiName GetByAuthors
 * @apiGroup User
 * 
 * @apiQuery {String} author The author's full name
 * 
 * @apiSuccess {String} titles List of book titles by given author
 * @apiSuccessExample {json} Success-Response:
 *   { "titles":  "Heaven, Ashley Bell, Falling Up" }
 */

/**
 * NOTE: This is a required endpoint
 * @api {get} /books?rating=:rating Get books by a rating 
 * 
 * @apiDescription Get books by a given rating
 * 
 * @apiName GetByRating
 * @apiGroup User
 * 
 * @apiQuery {Number} rating_avg The rating the books need to be at or above
 * 
 * @apiSuccess {String} title The books with the given
 * @apiSuccessExample {json} Success-Response:
 *   { "title":  "Animal Farm",
 *     "title":  "...” ,
 *      ect. }
 */

/**
 * @api {get} /books?title=:title Get books by a title 
 * 
 * @apiDescription Get books by a given title
 * 
 * @apiName GetByTitle
 * @apiGroup User
 * 
 * @apiQuery {String} title The title of a book
 * 
 * @apiSuccess {String} title The books title
 * @apiSuccessExample {json} Success-Response:
 *   { "title":  "Animal Farm" }
 */

/**
 * Publish year
 * @api {get} /books?year=:year Get books by publish year
 * 
 * @apiDescription Get books by a given publication year
 * 
 * @apiName PubYear
 * @apiGroup User
 * 
 * @apiQuery {Number} publication_year The year the book was published
 * 
 * @apiSuccess {String} title The book's title
 * @apiSuccessExample {json} Success-Response:
 *   { "publication_year":  "1945" }
 */








// ---------------- PUT ----------------

/**
 * Put
 * Update fields from ISBN
 * @api {put} /ISBN
 * 
 * @apiDescription Update fields from a book by ISBN
 * 
 * @apiName UpdateBookFields
 * @apiGroup Admin
 * 
 * @apiBody {String} [Book[isbn]]   	  
 * @apiBody {String} [Book[fieldType]]    The field we want to change
 * @apiBody {String} [Book[data]]   	  The new data we want to put in the field
 */

/**
 * Rating 1
 * NOTE: In the back end, update the average rating
 * @api {put} /rating1
 * 
 * @apiDescription Update the number of 1 star ratings for a book
 * 
 * @apiName UpdateRating1
 * @apiGroup User
 */

/**
 * Rating 2
 * NOTE: In the back end, update the average rating
 * @api {put} /rating2
 * 
 * @apiDescription Update the number of 2 star ratings for a book
 * 
 * @apiName UpdateRating2
 * @apiGroup User
 */

/**
 * Rating 3
 * NOTE: In the back end, update the average rating
 * @api {put} /rating3
 * 
 * @apiDescription Update the number of 3 star ratings for a book
 * 
 * @apiName UpdateRating3
 * @apiGroup User
 */

/**
 * Rating 4
 * NOTE: In the back end, update the average rating
 * @api {put} /rating4
 * 
 * @apiDescription Update the number of 4 star ratings for a book
 * 
 * @apiName UpdateRating4
 * @apiGroup User
 */

/**
 * Rating 5
 * NOTE: In the back end, update the average rating
 * @api {put} /rating5
 * 
 * @apiDescription Update the number of 5 star ratings for a book
 * 
 * @apiName UpdateRating5
 * @apiGroup User
*/

/**
 * Other endpoints to potentially add later:
 * Put:
 * Title
 * @api {put} /title
 * 
 * @apiDescription Update the title of a book
 * 
 * @apiName UpdateTitle
 * @apiGroup Admin
 * 
 * @apiSuccess {String} title The books title
 * @apiSuccessExample Success-Response:
    { "title":  "Animal Farm" }
 */

/**
 * Author
 * @api {put} /author
 * 
 * @apiDescription Update the author of a book
 * 
 * @apiName UpdateAuthor6
 * @apiGroup Admin
 * 
 * @apiQuery {String} title The title of the book to be updated 
 * 
 * @apiSuccess {String} title
 * @apiSuccessExample {json} Success-Response:
 *   { "titles":  "..." }
*/




// ---------------- POST ----------------

/**
 * Post
 * One post, fill in from body section
 * @api {post} / addBook
 * 
 * @apiDescription Add a book to the database
 * 
 * @apiName AddBook
 * @apiGroup Admin
*/







// ---------------- DELETE ----------------

/**
 * Delete
 * ISBNs 1 or more (required)
 * @api {delete} / ISBN
 * 
 * @apiDescription Delete one or more books by ISBN
 * 
 * @apiName DeleteISBNs
 * @apiGroup Admin
 * 
 * @apiBody {String[]} [isbn]   array of ISBNs. Can be 1 or more
 */


