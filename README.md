# GitHub User Search API

This project was created using create-react-app and utilises the following technologies:

-   React
-   Testing Library
-   Styled Components

I planned out the project using Trello. You can access the board and see my approach at this URL: https://trello.com/invite/b/jQRNE3XV/65ea29ad2264c6e7a24ccc1483bc8406/github-user-search.

## Running the app

Clone the project and run `yarn` to install required dependencies.

Start the project using `yarn start`.

## My Approach

The approach I took was to build out the core components using TDD, with a focus on accessibility. I built these components unstyled.

Once I had the components in place, I created the logic for handling the API requests using `fetch`.

I then wired everything together in the App, finishing up with adding styles to complete the look and feel.

## Challenges I faced

My biggest challenge was coming to a decision on how the pagination should work. I wanted to use a similar approach to GitHub and always display the last few pages based on the current page the user is on. This works very well when there are a large number of pages. I didn't think I would have enough time to create the algorithm and do everything else I wanted to do so I made the decision to simplify the approach, opting to use a page range that always displays 5 pages at a time.

GitHub limits the number of unauthenticated requests to 10 per minute. When this threshold is met, API requests fail to resolve. My app makes an initial request to the GitHub API to retrieve a list of users based on a search term. The resulting model provides basic user information such as the profile image or the username.

To get additional information such as followers and location I needed to make an additional request for every user displayed on the screen. This meant I was reaching the request limit frequently. To resolve this, I made the decision to use an accordion element inside the user search result that only fetches information from the API when it is requested, resulting in fewer API calls being made.

The main app component and the user tab components are both responsible for making requests to the API. The app makes a request to get the initial results based on the search query, and the user tab makes additional requests to fetch different pages for the same search query.

I chose this approach because I didn't want the whole app to re-render when changing pages inside the users tab. It made sense that only the users tab should re-render when a page is changed because the search query and number of results found doesn't change, only the page does.

The user tab makes a request to the API on its initial render and whenever the current page or current page size changes. The request on the initial render is always the same as the request made by the app, because it retrieves the search results for the first page. This meant I had two duplicate requests being made when the user tab is opened for the first time.

I resolved the issue by making a comparison between the current page value and what it was on the previous render (using the usePrevious hook from https://usehooks.com/usePrevious/). If I had more time I'd have liked to address this issue as I don't feel like the solution is the correct one.

## Future Improvements

-   Better visibility and awareness of when the app is searching and not searching for results. I could have used a loading spinner for better visibility when searching, and I could have provided better UX around when the search is disabled e.g. when the same search term is entered twice or when user tries to submit an empty search after a successful search has already been performed.
-   I would enhance the pagination to allow the user to navigate pages more easily. I would potentially have a "Go to Page" option that allows the user to manually enter a page, or I would change the algorithm so that it displays a better range as the user is navigating through pages.
-   I'd have liked to have the Repos tab be functional. My plan was to click on some sort of "Repositories" button inside the user profile information and open a list of repositories owned by that user in the Repos tab.
-   I'd have liked to have an Advanced Search feature that would allow search results to be narrowed down using GitHub qualifiers e.g. finding users by location.
-   The search could be improved by setting a minimum letter constraint on the search input. I can currently search by a single letter which results in hundreds of thousands of results being returned. GitHub only ever returns a maximum of 1000 results so it seems unnecessary for the app to allow such a wide search.
-   I thought about adding a feature that would autocomplete search results as the user is typing in the search box. It could autocomplete results by name for example. This would have been quite challenging because of the number of potential results but also the constraint around the number of requests that can be made in a minute. It may have been possible using a combination of debounce and memoisation so that we don't continuously search for the same data when it has already been received once before. I'd have liked to have seen if this was achievable!
-   My original plan was to allow the core search to return results for users, repositories and code. The fetch functionality is already set up to allow searching by users or repositories, but I abandoned the idea as I wanted to focus on the core criteria around searching users. It would be good if the initial search would populate both the users and the repositories tab with results found across both areas.
-   There are some accessibility improvements that can be made such as changing the document title when search results are found.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
