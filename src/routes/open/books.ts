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

// Import the interfaces for typechecking
import { IBook, IRatings, IUrlIcon } from '../../core/models/books';

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

function mwValidRating(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const rating: string = request.body.changeRating as string;
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

function mwValidNewRating(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const rating: string = request.body.newRating as string;
    if (validationFunctions.isNumberProvided(rating) && parseInt(rating) >= 0) {
        next();
    } else {
        console.error('Invalid or missing New Rating');
        response.status(400).send({
            message:
                'Invalid or missing New Rating - please refer to documentation',
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
 * @apiSuccess {Number} book.isbn13 The ISBN of the book
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
 * @apiBody {Number} book.isbn13 The ISBN of the book
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
 * @apiSuccess {Object[]}  The list of books in the database
 * @apiUse BookSuccess
 *
 * @apiSuccessExample {json} Success-Response:
 *   [
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
 * @api {get} /books/isbn/:isbn Get book by ISBN
 *
 * @apiDescription Get a specific book by ISBN
 *
 * @apiName GetByISBN
 * @apiGroup User
 *
 * @apiParam {Number} isbn The ISBN paired with a given book
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
 * @api {get} /books/author?author=:author Get books by author
 *
 * @apiDescription Get books by a given author
 *
 * @apiName GetByAuthors
 * @apiGroup User
 *
 * @apiQuery {String} author The author's full name
 *
 * @apiSuccess {Object[]} The list of books by the given author
 * @apiUse BookSuccess
 *
 * @apiSuccess {String} titles List of book titles by given author
 * @apiSuccessExample {json} Success-Response:
 *   [
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
 *
 * @apiError (400: Bad Request) {String} message The provided author is not valid or supported
 */
bookRouter.get(
    '/author/',
    // mwValidAuthorQuery, 
    (request: Request, response: Response) => {
        const theQuery = `SELECT * FROM books WHERE authors ILIKE $1`;
        const values = [`%${request.query.author}%`];

        pool.query(theQuery, values)
            .then((result) => {
                response.json(result.rows);
            })
            .catch(err => {
                response.status(400).send({
                    message: "Error: " + err.detail
                });
            });
    
});

/**
 * NOTE: This is a required endpoint
 * @api {get} /books/rating?rating=:rating Get books by rating
 *
 * @apiDescription Get all books at a given rating or above
 *
 * @apiName GetByRating
 * @apiGroup User
 *
 * @apiQuery {Number} rating_avg The rating the books need to be at or above
 *
 * @apiSuccess {Object[]} The list of books with the given rating or above
 * @apiUse BookSuccess
 *
 * @apiSuccessExample {json} Success-Response:
 *   [
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
 *
 * @apiError (400: Bad Request) {String} message The provided rating is not valid or supported
 */
bookRouter.get(
    '/rating/',
    // mwValidRating,
    (request: Request, response: Response) => {
        const theQuery = `SELECT * FROM books WHERE rating_avg >= $1`;
        const values = [request.query.rating];

        pool.query(theQuery, values)
            .then((result) => {
                response.json(result.rows);
            })
            .catch(err => {
                response.status(400).send({
                    message: "Error: " + err.detail
                });
            });
    
    });

    

/**
 * @api {get} /books/title?title=:title Get books by title
 *
 * @apiDescription Get books by a given title
 *
 * @apiName GetByTitle
 * @apiGroup User
 *
 * @apiQuery {String} title The title of the book
 *
 * @apiSuccess {Object[]} The list of books with the given title
 * @apiUse BookSuccess
 *
 * @apiSuccessExample {json} Success-Response:
 *   [
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
 *
 * @apiError (400: Bad Request) {String} message The provided title is not valid or supported
 */

/**
 * Publish year
 * @api {get} /books/year?year=:year Get books by publication year
 *
 * @apiDescription Get books by a given publication year
 *
 * @apiName PubYear
 * @apiGroup User
 *
 * @apiQuery {Number} publication_year The year the book was published
 *
 * @apiSuccess {Object[]} The list of books with the given publication year
 * @apiUse BookSuccess
 *
 * @apiSuccessExample {json} Success-Response:\
 *   [
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
 *
 * @apiError (400: Bad Request) {String} message The provided publication year is not valid or supported
 */

// ---------------- PUT ----------------

/**
 * @api {put} /books/isbn/:isbn Update book fields by ISBN
 *
 * @apiDescription Update specific fields of a book identified by its ISBN
 *
 * @apiName UpdateBookFields
 * @apiGroup Admin
 *
 * @apiParam {Number} isbn The ISBN of the book to be updated
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
 * @apiParam {Number} isbn The ISBN of the book to be updated
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
        const rate = 'rating_' + request.body.changeRating + '_star';
        const selectBookInfo = 'SELECT * FROM Books WHERE isbn13 = $1';
        const values = [request.body.isbn];
        let rating_1_star, rating_2_star, rating_3_star, rating_4_star;
        let rating_5_star, total, newAverage, newRating;

        pool.query(selectBookInfo, values)
            .then((result) => {
                if (result.rowCount == 1) {
                    rating_1_star = result.rows[0].rating_1_star;
                    rating_2_star = result.rows[0].rating_2_star;
                    rating_3_star = result.rows[0].rating_3_star;
                    rating_4_star = result.rows[0].rating_4_star;
                    rating_5_star = result.rows[0].rating_5_star;
                    total =
                        rating_1_star +
                        rating_2_star +
                        rating_3_star +
                        rating_4_star +
                        rating_5_star +
                        1;
                    newRating = rate;
                    newAverage = (
                        (rating_1_star * 1 +
                            rating_2_star * 2 +
                            rating_3_star * 3 +
                            rating_4_star * 4 +
                            rating_5_star * 5 +
                            request.body.changeRating) /
                        total
                    ).toFixed(6);
                    const updateQueryRating = `UPDATE BOOKS SET ${rate} = ${newRating} + 1, rating_count = ${total}, rating_avg = ${newAverage} WHERE isbn13 = $1 RETURNING *`;
                    return pool.query(updateQueryRating, values);
                } else {
                    response.status(404).send({
                        message: 'No book OR multiple books found',
                    });
                }
            })
            .then((result) => {
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
                        result.rows[0].rating_count +
                        ' AVERAGE: ' +
                        result.rows[0].rating_avg,
                });
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
 * @api {put} /books/:isbn/newRating/:rating Update book rating
 *
 * @apiDescription Update the ratings of a book. The rating type should be between 1 and 5.
 *
 * @apiName UpdateRating
 * @apiGroup Admin
 *
 * @apiParam {Number} isbn The ISBN of the book to be updated
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

bookRouter.put(
    '/newRating/admin',
    mwValidRating,
    mwValidNewRating,
    mwValidISBNQuery,
    (request: Request, response: Response, next: NextFunction) => {
        const rate = 'rating_' + request.body.changeRating + '_star';
        const selectBookInfo = `SELECT rating_1_star, rating_2_star, rating_3_star, rating_4_star, rating_5_star, ${rate} AS "oldRating"  FROM Books WHERE isbn13 = $1`;
        const values = [request.body.isbn];
        let rating_1_star, rating_2_star, rating_3_star, rating_4_star;
        let rating_5_star, total, newAverage, oldRating;

        pool.query(selectBookInfo, values)
            .then((result) => {
                if (result.rowCount == 1) {
                    rating_1_star = result.rows[0].rating_1_star;
                    rating_2_star = result.rows[0].rating_2_star;
                    rating_3_star = result.rows[0].rating_3_star;
                    rating_4_star = result.rows[0].rating_4_star;
                    rating_5_star = result.rows[0].rating_5_star;
                    oldRating = result.rows[0].oldRating;
                    total =
                        rating_1_star +
                        rating_2_star +
                        rating_3_star +
                        rating_4_star +
                        rating_5_star -
                        oldRating +
                        request.body.newRating;
                    newAverage = (
                        (rating_1_star * 1 +
                            rating_2_star * 2 +
                            rating_3_star * 3 +
                            rating_4_star * 4 +
                            rating_5_star * 5 -
                            oldRating * request.body.changeRating +
                            request.body.newRating *
                                request.body.changeRating) /
                        total
                    ).toFixed(6);
                    const values2 = [request.body.isbn, request.body.newRating];
                    const updateQueryRating = `UPDATE BOOKS SET ${rate} = $2, rating_count = ${total}, rating_avg = ${newAverage} WHERE isbn13 = $1 RETURNING *`;
                    return pool.query(updateQueryRating, values2);
                } else {
                    response.status(404).send({
                        message: 'No book OR multiple books found',
                    });
                }
            })
            .then((result) => {
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
                        result.rows[0].rating_count +
                        ' AVERAGE: ' +
                        result.rows[0].rating_avg,
                });
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
 * @api {post} /books/add Add a new book
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
 * @api {delete} /books/isbn Delete book by ISBN
 *
 * @apiDescription Delete one or more books by ISBN
 *
 * @apiName DeleteISBNs
 * @apiGroup Admin
 *
 * @apiBody {String[]} isbns array of ISBNs. Can be 1 or more
 *
 * @apiSuccess {String} message The number of books deleted
 * @apiSuccess {String[]} isbns The ISBNs of the books that were deleted
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "message": "2 book(s) deleted successfully.",
 *   "isbns": [
 *       "9780375700451",
 *       "9780375700452"
 *   ]
 * }
 * 
 * @apiError (400: Bad Request) {String} message An error occurred during query execution
 * @apiError (404: Not Found) {String} message No books found with the provided ISBNs
 */
bookRouter.delete(
    '/isbn',
    (request: Request, response: Response) => {
        const isbns = request.body.isbns;
        const placeholders = isbns.map((_, i) => `$${i + 1}`).join(','); // $1, $2, $3, etc.
        const theQuery = `DELETE FROM books WHERE isbn13 IN (${placeholders});`;

        pool.query(theQuery, isbns)
            .then((result) => {
                if (result.rowCount > 0) {
                    response.send({ message: `${result.rowCount} book(s) deleted successfully.`, isbns: isbns });
                } else {
                    response.status(404).send({ message: 'No books found with the provided ISBNs.', isbns: isbns });
                }
            })
            .catch(err => {
                response.status(400).send({
                    message: "Error: " + err.detail
                });
            });
    }
);



// "return" the router
export { bookRouter };