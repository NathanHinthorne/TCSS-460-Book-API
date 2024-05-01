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