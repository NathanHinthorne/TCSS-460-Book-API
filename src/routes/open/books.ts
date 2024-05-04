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


// ---------------- GET ----------------

/**
 * Get
 * All books (required) - returns all books in the database 
 * 
 * @api {get} /allBooks
 * @apiName GetAllBooks
 * @apiGroup User
 * @apiVersion 0.1.0
 * @apiSuccess {Object[]} bookList List of all the books
 * 
 * @apiSuccessExample  Success-Response:
 *  { "title":  "Animal Farm", "titles":  "...” , ect. }
 */

// @apiSuccess {String} bookList.title The books title

/** 
 * ISBN (required) - get specific book by ISBN
 * @api {get} /books Get Book by ISBN
 * @apiName GetByISBN
 * @apiGroup User
 * @apiVersion 0.1.0
 * @apiParam {String} The ISBN paired with a given book
 * @apiSuccess {String} title The books title
 * @apiSuccessExample {json} Success-Response:
 *  { "title":  "Charlotte’s Web" }
*/

/**
 * Author (required) - get books by an author
 * @api {get} /author
 * @apiName GetByAuthors
 * @apiGroup User
 * @apiVersion 0.1.0
 * @apiQuery {String} author The author's full name
 * @apiSuccess {String} titles List of book titles by given author
 * @apiSuccessExample {json} Success-Response:
 *   { "titles":  "Heaven, Ashley Bell, Falling Up" }
 */

/**
 * Rating (required) - get books by a rating 
 * @api {get} /rating
 * @apiName GetByRating
 * @apiGroup User
 * @apiQuery {Number} rating_avg The rating the books need to be at or above
 * @apiVersion 0.1.0
 * @apiSuccess {String} title The books with the given
 * @apiSuccessExample {json} Success-Response:
 *   { "title":  "Animal Farm",
 *     "title":  "...” ,
 *      ect. }
 */

/**
 * Title (required) - get books by a title 
 * @api {get} /title
 * @apiName GetByTitle
 * @apiGroup User
 * @apiVersion 0.1.0
 * @apiQuery {String} title The title of a book
 * @apiSuccess {String} title The books title
 * @apiSuccessExample {json} Success-Response:
 *   { "title":  "Animal Farm" }
 */

/**
 * Publish year
 * @api {get} /publishYear
 * @apiName PubYear
 * @apiGroup User
 * @apiVersion 0.1.0
 * @apiSuccess {Number} publication_year The year the book was published 
 * @apiSuccessExample {json} Success-Response:
 *   { "publication_year":  "1945" }
 */








// ---------------- PUT ----------------

/**
 * Put
 * Update fields from ISBN
 * @api {put} /ISBN
 * @apiName UpdateBookFields
 * @apiGroup Admin
 * @apiBody {String} [Book[isbn]]   	  
 * @apiBody {String} [Book[fieldType]]    The field we want to change
 * @apiBody {String} [Book[data]]   	  The new data we want to put in the field
 */

/**
 * Rating 1
 * In the back end, update the average rating
 * @api {put} /rating1
 * @apiName UpdateRating1
 * @apiGroup User
 */

/**
 * Rating 2
 * @api {put} /rating2
 * @apiName UpdateRating2
 * @apiGroup User
 */

/**
 * Rating 3
 * @api {put} /rating3
 * @apiName UpdateRating3
 * @apiGroup User
 */

/**
 * Rating 4
 * @api {put} /rating4
 * @apiName UpdateRating4
 * @apiGroup User
 */

/**
 * Rating 5
 * @api {put} /rating5
 * @apiName UpdateRating5
 * @apiGroup User
*/

/**
 * Other endpoints to potentially add later:
 * Put:
 * Title
 * @api {put} /title
 * @apiName UpdateTitle
 * @apiGroup Admin
 * @apiSuccess  {String} title The books title
 * @apiSuccessExample Success-Response:
    { "title":  "Animal Farm" }
 */

/**
 * Author
 * @api {put} /author
 * @apiName UpdateAuthor6
 * @apiGroup Admin
 * @apiVersion 0.1.0
 * @apiQuery {String} title The title of the book to be updated 
 * @apiSuccess {String} title
 * @apiSuccessExample {json} Success-Response:
 *   { "titles":  "..." }
*/

// (average rating will be updated on the backend whenever rating 1/2/3/4/5 is updated)







// ---------------- POST ----------------

/**
 * Post
 * One post, fill in from body section
 * @api {post} / addBook
 * @apiName AddBook
 * @apiGroup Admin
*/







// ---------------- DELETE ----------------

/**
 * Delete
 * ISBNs 1 or more (required)
 * @api {delete} / ISBN
 * @apiName DeleteISBNs
 * @apiGroup Admin
 * @apiBody {String[]} [isbn]   array of ISBNs. Can be 1 or more
 */


