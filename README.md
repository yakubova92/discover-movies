# Discover Movies

## Running the App
* To secure the api-key to access TheMovieDB, I am using a `secrets.js` file. This file is listed in `server/.gitignore` and will therefore not be available to you when you clone the project to run it locally. You will need to create `server/secrets.js` with this code:
```
const api_key = <your-api-key>

module.exports = {
  api_key
}
```
* The front-end and back-end are decoupled and run on separate servers. For this app to function properly, you will need to run both servers at the same time.
  * To run the back-end, open a terminal window and cd into `/server`. Run `npm install` and `npm run start`. The server will be listening at port 8000
  * To run the front-end, open a second terminal window or tab and cd into `/client`. Run `npm install` and `npm run start`. Open your browser and go to `localhost:3000`. You should see the home page.

## Running Through Features
* The home page displays popular movies on load.
* Search bar
  * results will be updated as you type
  * if you clear the search, it will go back to displaying popular results.
* Movie details
  * If you click on a movie, you will be redirected to the movie details page.
  * Clicking on the film icon at the top left of the page, or using the browsers back button, you will be navigated back to the home page
* Show more results (additional feature)
  * If you scroll all the way down on the home page, you'll see a `show more` button that will load the next page of results. The number of results shown is always displayed.

## Technical Decisions and Future Improvements
* search bar: A debounced search that waits for the user to stop typing before sending a query would be an improvement. Since TheMovieDB does not enforce a rate limit, I don't anticipate any issues with normal use.

* api routes: To reduce the workload on the client, the server sends back only the information the client needs. This should improve performance as some of the query results can be large (ex: getting the cast for a movie). This couples the server to the client, but considering the fact that these queries to TheMovieDB could have been done through the front-end directly, I think it makes sense to have this optimization if I'm going to have a back-end. An alternative solution would be using GraphQL.

* Given more time, I would make the following improvements:
  * Fallback images for movie posters, backdrops, and cast profiles when requests to TheMovieDB return 404 errors.
  * Better organized CSS classes using BEM class names.

