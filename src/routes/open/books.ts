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

function mwValidRating(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const rating: string = request.body.rating as string;
    if (
        validationFunctions.isNumberProvided(rating) &&
        parseInt(rating) >= 1 &&
        parseInt(rating) <= 5
    ) {
        next();
    } else {
        console.error('Invalid or missing Rating');
        response.status(400).send({
            message:
                'Invalid or missing Rating - please refer to documentation',
        });
    }
}

function mwValidTitleQuery(
    request: Request,
    response: Response,
    next: NextFunction
) {
    //const priority: string = request.query.title as string;
    if (validationFunctions.isStringProvided(request.body.title)) {
        next();
    } else {
        console.error('Invalid or missing Book Title');
        response.status(400).send({
            message:
                'Invalid or missing  Book Title - please refer to documentation',
        });
    }
}

function mwValidAuthorQuery(
    request: Request,
    response: Response,
    next: NextFunction
) {
    //const priority: string = request.query.authors as string;
    if (validationFunctions.isStringProvided(request.body.authors)) {
        next();
    } else {
        console.error('Invalid or missing Author');
        response.status(400).send({
            message:
                'Invalid or missing Author - please refer to documentation',
        });
    }
}

function mwValidISBNQuery(
    request: Request,
    response: Response,
    next: NextFunction
) {
    //const isbn: string = request.query.isbn13 as string;
    if (validationFunctions.isNumberProvided(request.body.isbn)) {
        next();
    } else {
        console.error('Invalid or missing ISBN');
        response.status(400).send({
            message: 'Invalid or missing ISBN - please refer to documentation',
        });
    }
}
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

/**
 * This defines what a "book" object looks like.
 * It keeps us from typing the book object out multiple times.
 *
 * This particular one is for whenever we need to return a book object.
 *
 * @apiDefine BookSuccess
 * @apiSuccess {String} book.isbn13 The ISBN of the book
 * @apiSuccess {String} book.authors The authors of the book
 * @apiSuccess {Number} book.publication_year The year the book was published
 * @apiSuccess {String} book.original_title The original title of the book
 * @apiSuccess {String} book.title The title of the book
 * @apiSuccess {Number} book.rating_avg The average rating of the book
 * @apiSuccess {Number} book.rating_count The number of ratings the book has
 * @apiSuccess {Number} book.rating_1_star The number of 1 star ratings the book has
 * @apiSuccess {Number} book.rating_2_star The number of 2 star ratings the book has
 * @apiSuccess {Number} book.rating_3_star The number of 3 star ratings the book has
 * @apiSuccess {Number} book.rating_4_star The number of 4 star ratings the book has
 * @apiSuccess {Number} book.rating_5_star The number of 5 star ratings the book has
 * @apiSuccess {String} book.image_url The URL of the image of the book
 * @apiSuccess {String} book.image_small_url The URL of the small image of the book
 */

/**
 * This defines what a "book" object looks like.
 * It keeps us from typing the book object out multiple times.
 *
 * This particular one is for whenever we need a book object as input in the body.
 *
 * @apiDefine BookBody
 * @apiBody {String} book.isbn13 The ISBN of the book
 * @apiBody {String} book.authors The authors of the book
 * @apiBody {Number} book.publication_year The year the book was published
 * @apiBody {String} book.original_title The original title of the book
 * @apiBody {String} book.title The title of the book
 * @apiBody {Number} book.rating_avg The average rating of the book
 * @apiBody {Number} book.rating_count The number of ratings the book has
 * @apiBody {Number} book.rating_1_star The number of 1 star ratings the book has
 * @apiBody {Number} book.rating_2_star The number of 2 star ratings the book has
 * @apiBody {Number} book.rating_3_star The number of 3 star ratings the book has
 * @apiBody {Number} book.rating_4_star The number of 4 star ratings the book has
 * @apiBody {Number} book.rating_5_star The number of 5 star ratings the book has
 * @apiBody {String} book.image_url The URL of the image of the book
 * @apiBody {String} book.image_small_url The URL of the small image of the book
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
 * @apiSuccess {Object[]} bookList The list of books in the database
 * @apiUse BookSuccess
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "bookList":  [
 *     {
 *       "isbn13": "9780451526342",
 *       "authors": "George Orwell",
 *       "publication_year": "1945",
 *       "original_title": "Animal Farm",
 *       "title": "Animal Farm",
 *       "rating_avg": "3.9",
 *       "rating_count": "2000",
 *       "rating_1_star": "100",
 *       "rating_2_star": "200",
 *       "rating_3_star": "500",
 *       "rating_4_star": "700",
 *       "rating_5_star": "500",
 *       "image_url": "http://example.com/image.jpg",
 *       "image_small_url": "http://example.com/small_image.jpg"
 *     }
 *   ]
 * }
 *
 * @apiError (404: Books Not Found) {String} message No books were found in the database
 */
bookRouter.get('/all', (request: Request, response: Response) => {
    const theQuery = 'SELECT * FROM BOOKS';

    pool.query(theQuery)
        .then((result) => {
            if (result.rowCount >= 1) {
                response.send({
                    entries: result.rows,
                });
            } else {
                response.status(404).send({
                    message: 'Books not found',
                });
            }
        })
        .catch((error) => {
            //log the error
            console.error('DB Query error on GET all');
            console.error(error);
            response.status(500).send({
                message: 'server error - contact support',
            });
        });
});

/**
 * NOTE: This is a required endpoint
 * @api {get} /books/:isbn Get book by ISBN
 *
 * @apiDescription Get a specific book by ISBN
 *
 * @apiName GetByISBN
 * @apiGroup User
 *
 * @apiParam {String} isbn The ISBN paired with a given book
 *
 * @apiSuccess {Object} book The book with the given ISBN
 * @apiUse BookSuccess
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "book": {
 *       "isbn13": "9780451526342",
 *       "authors": "George Orwell",
 *       "publication_year": "1945",
 *       "original_title": "Animal Farm",
 *       "title": "Animal Farm",
 *       "rating_avg": "3.9",
 *       "rating_count": "2000",
 *       "rating_1_star": "100",
 *       "rating_2_star": "200",
 *       "rating_3_star": "500",
 *       "rating_4_star": "700",
 *       "rating_5_star": "500",
 *       "image_url": "http://example.com/image.jpg",
 *       "image_small_url": "http://example.com/small_image.jpg"
 *    }
 * }
 *
 *
 * @apiError (400: Bad Request) {String} message The requested ISBN is not valid
 */

/**
 * NOTE: This is a required endpoint
 * @api {get} /books?author=:author Get books by author
 *
 * @apiDescription Get books by a given author
 *
 * @apiName GetByAuthors
 * @apiGroup User
 *
 * @apiQuery {String} author The author's full name
 *
 * @apiSuccess {Object[]} bookList The list of books by the given author
 * @apiUse BookSuccess
 *
 * @apiSuccess {String} titles List of book titles by given author
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "bookList":  [
 *     {
 *       "isbn13": "9780451526342",
 *       "authors": "George Orwell",
 *       "publication_year": "1945",
 *       "original_title": "Animal Farm",
 *       "title": "Animal Farm",
 *       "rating_avg": "3.9",
 *       "rating_count": "2000",
 *       "rating_1_star": "100",
 *       "rating_2_star": "200",
 *       "rating_3_star": "500",
 *       "rating_4_star": "700",
 *       "rating_5_star": "500",
 *       "image_url": "http://example.com/image.jpg",
 *       "image_small_url": "http://example.com/small_image.jpg"
 *     }
 *   ]
 * }
 *
 * @apiError (400: Bad Request) {String} message The provided author is not valid or supported
 */

/**
 * NOTE: This is a required endpoint
 * @api {get} /books?rating=:rating Get books by rating
 *
 * @apiDescription Get books by a given rating
 *
 * @apiName GetByRating
 * @apiGroup User
 *
 * @apiQuery {Number} rating_avg The rating the books need to be at or above
 *
 * @apiSuccess {Object[]} bookList The list of books with the given rating or above
 * @apiUse BookSuccess
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "bookList":  [
 *     {
 *       "isbn13": "9780451526342",
 *       "authors": "George Orwell",
 *       "publication_year": "1945",
 *       "original_title": "Animal Farm",
 *       "title": "Animal Farm",
 *       "rating_avg": "3.9",
 *       "rating_count": "2000",
 *       "rating_1_star": "100",
 *       "rating_2_star": "200",
 *       "rating_3_star": "500",
 *       "rating_4_star": "700",
 *       "rating_5_star": "500",
 *       "image_url": "http://example.com/image.jpg",
 *       "image_small_url": "http://example.com/small_image.jpg"
 *     }
 *   ]
 * }
 *
 * @apiError (400: Bad Request) {String} message The provided rating is not valid or supported
 */

/**
 * @api {get} /books?title=:title Get books by title
 *
 * @apiDescription Get books by a given title
 *
 * @apiName GetByTitle
 * @apiGroup User
 *
 * @apiQuery {String} title The title of the book
 *
 * @apiSuccess {Object[]} bookList The list of books with the given title
 * @apiUse BookSuccess
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "bookList":  [
 *     {
 *       "isbn13": "9780451526342",
 *       "authors": "George Orwell",
 *       "publication_year": "1945",
 *       "original_title": "Animal Farm",
 *       "title": "Animal Farm",
 *       "rating_avg": "3.9",
 *       "rating_count": "2000",
 *       "rating_1_star": "100",
 *       "rating_2_star": "200",
 *       "rating_3_star": "500",
 *       "rating_4_star": "700",
 *       "rating_5_star": "500",
 *       "image_url": "http://example.com/image.jpg",
 *       "image_small_url": "http://example.com/small_image.jpg"
 *     }
 *   ]
 * }
 *
 * @apiError (400: Bad Request) {String} message The provided title is not valid or supported
 */

/**
 * Publish year
 * @api {get} /books?year=:year Get books by publication year
 *
 * @apiDescription Get books by a given publication year
 *
 * @apiName PubYear
 * @apiGroup User
 *
 * @apiQuery {Number} publication_year The year the book was published
 *
 * @apiSuccess {Object[]} bookList The list of books with the given publication year
 * @apiUse BookSuccess
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "bookList":  [
 *     {
 *       "isbn13": "9780451526342",
 *       "authors": "George Orwell",
 *       "publication_year": "1945",
 *       "original_title": "Animal Farm",
 *       "title": "Animal Farm",
 *       "rating_avg": "3.9",
 *       "rating_count": "2000",
 *       "rating_1_star": "100",
 *       "rating_2_star": "200",
 *       "rating_3_star": "500",
 *       "rating_4_star": "700",
 *       "rating_5_star": "500",
 *       "image_url": "http://example.com/image.jpg",
 *       "image_small_url": "http://example.com/small_image.jpg"
 *     }
 *   ]
 * }
 *
 * @apiError (400: Bad Request) {String} message The provided publication year is not valid or supported
 */

// ---------------- PUT ----------------

/**
 * @api {put} /books/:isbn Update book fields by ISBN
 *
 * @apiDescription Update specific fields of a book identified by its ISBN
 *
 * @apiName UpdateBookFields
 * @apiGroup Admin
 *
 * @apiParam {String} isbn The ISBN of the book to be updated
 *
 * @apiBody {Object} fields The fields to be updated with their new values
 * @apiUse BookBody
 *
 * @apiSuccess {Object} book The updated book
 *
 * @apiError (400: Bad Request) {String} message The provided ISBN or fields are not valid
 * @apiError (404: Not Found) {String} message The book with the provided ISBN was not found
 */

/**
 * NOTE: In the back end, update the average rating and rating count since the rating has changed
 * NOTE: Since a user can only rate a book once, the rating count should only ever increase by 1.
 *      If a user changes their rating, the old rating should be removed and the new rating should be added.
 *
 * @api {put} /books/:isbn/rating/:rating Increment book rating
 *
 * @apiDescription Increment the ratings of a book. The rating type should be between 1 and 5.
 *
 * @apiName IncrementRating
 * @apiGroup User
 *
 * @apiParam {String} isbn The ISBN of the book to be updated
 * @apiParam {Number} rating The rating type to be updated (1-5)
 *
 * @apiSuccess {Object} book The updated book
 * @apiUse BookSuccess
 *
 * @apiError (400: Bad Request) {String} message The provided ISBN, rating, or count are not valid
 * @apiError (404: Not Found) {String} message The book with the provided ISBN was not found
 */

bookRouter.put(
    '/newRating',
    mwValidRating,
    mwValidISBNQuery,
    (request: Request, response: Response, next: NextFunction) => {
        const rate = 'rating_' + request.body.rating + '_star';
        const theQuery =
            'UPDATE BOOKS SET ' +
            rate +
            ' = (SELECT ' +
            rate +
            ' FROM BOOKS WHERE isbn13 = $1) + 1 WHERE isbn13 = $2 RETURNING *';
        const values = [request.body.isbn, request.body.isbn];
        pool.query(theQuery, values)
            .then(() => {
                const updateQuery =
                    'UPDATE BOOKS SET rating_count = (SELECT rating_count FROM BOOKS WHERE isbn13 = $1) + 1 WHERE isbn13 = $2 RETURNING *';
                const updatedValues = [request.body.isbn, request.body.isbn];
                return pool.query(updateQuery, updatedValues);
            })
            .then((result) => {
                const oneStar = result.rows[0].rating_1_star;
                const twoStar = result.rows[0].rating_2_star;
                const threeStar = result.rows[0].rating_3_star;
                const fourStar = result.rows[0].rating_4_star;
                const fiveStar = result.rows[0].rating_5_star;
                const total = result.rows[0].rating_count;
                const newAverage =
                    (oneStar * 1 +
                        twoStar * 2 +
                        threeStar * 3 +
                        fourStar * 4 +
                        fiveStar * 5) /
                    total;
                console.log(newAverage);
                const updateQueryAvg =
                    'UPDATE BOOKS SET rating_avg = ' +
                    newAverage.toFixed(2) +
                    ' WHERE isbn13 = $1 RETURNING *';
                const updatedValuesAvg = [request.body.isbn];
                return pool.query(updateQueryAvg, updatedValuesAvg);
            })
            .then((result) => {
                if (result.rowCount == 1) {
                    response.send({
                        entry:
                            'Updated: ' +
                            result.rows[0].title +
                            ' ratings: 1 star -> ' +
                            result.rows[0].rating_1_star +
                            '  2 star -> ' +
                            result.rows[0].rating_2_star +
                            ' 3 star -> ' +
                            result.rows[0].rating_3_star +
                            ' 4 star -> ' +
                            result.rows[0].rating_4_star +
                            ' 5 star -> ' +
                            result.rows[0].rating_5_star +
                            ' total: ' +
                            result.rows[0].rating_avg +
                            ' AVERAGE: ' +
                            result.rows[0].rating_avg,
                    });
                } else {
                    response.status(404).send({
                        message: 'No book OR multiple books found',
                    });
                }
            })
            .catch((error) => {
                //log the error
                console.error('DB Query error on PUT');
                console.error(error);
                response.status(500).send({
                    message: 'server error - contact support',
                });
            });
    }
);

/**
 * NOTE: In the back end, update the average rating and rating count since the rating has changed
 * NOTE: An admin is allowed to adjust the ratings without a limit.
 *
 * @api {put} /books/:isbn/rating/:rating Update book rating
 *
 * @apiDescription Update the ratings of a book. The rating type should be between 1 and 5.
 *
 * @apiName UpdateRating
 * @apiGroup Admin
 *
 * @apiParam {String} isbn The ISBN of the book to be updated
 * @apiParam {Number} rating The rating type to be updated (1-5)
 *
 * @apiBody {Number} count The new count for the specified rating
 *
 * @apiSuccess {Object} book The updated book
 * @apiUse BookSuccess
 *
 * @apiError (400: Bad Request) {String} message The provided ISBN, rating, or count are not valid
 * @apiError (404: Not Found) {String} message The book with the provided ISBN was not found
 */

// I haven't finished these two endpoints yet. -Nathan
/*
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
/*
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
 * NOTE: Required endpoint
 * NOTE: This endpoint should allow null values for fields that are not required
 *
 * @api {post} /books Add a new book
 *
 * @apiDescription Add a new book to the database
 *
 * @apiName AddBook
 * @apiGroup Admin
 *
 * @apiBody {Object} book The book to be added
 * @apiUse BookBody
 *
 * @apiParamExample {json} Request-Example:
 * {
 *   "isbn13": "9780451526342",
 *   "authors": "George Orwell",
 *   "publication_year": "1945",
 *   "original_title": "Animal Farm",
 *   "title": "Animal Farm",
 *   "rating_avg": "3.9",
 *   "rating_count": "2000",
 *   "rating_1_star": "100",
 *   "rating_2_star": "200",
 *   "rating_3_star": "500",
 *   "rating_4_star": "700",
 *   "rating_5_star": "500",
 *   "image_url": "http://example.com/image.jpg",
 *   "image_small_url": "http://example.com/small_image.jpg"
 * }
 *
 * @apiSuccess {Object} book The book that was added
 * @apiUse BookSuccess
 *
 * @apiError (400: Bad Request) {String} message The provided book data is not valid
 */

// ---------------- DELETE ----------------

/**
 * NOTE: Required endpoint
 * ISBNs 1 or more (required)
 * @api {delete} /isbn Delete books by ISBN
 *
 * @apiDescription Delete one or more books by ISBN
 *
 * @apiName DeleteISBNs
 * @apiGroup Admin
 *
 * @apiBody {String[]} isbns array of ISBNs. Can be 1 or more
 *
 * @apiSuccess {String[]} isbns The ISBNs of the books that were deleted
 *
 * @apiError (400: Bad Request) {String} message At least one of the provided ISBNs is not valid
 */

export { bookRouter };
