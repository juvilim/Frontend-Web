# Peronal Project

This is a web page created using [CRA](https://create-react-app.dev/) that contains a data table fetched from [Random User's API](https://randomuser.me/documentation) with functionalities as below:

- search by keyword
- filter by gender
- sort by column
- pagination


### Tech Stacks

**Key Technologies**: React, Typescript, CSS.

**Libraries**: Jest (default from CRA), React-Query, React Router DOM, Lodash.

I use [lodash](https://lodash.com/)'s debounce to debounce most of the functionalities (search, filter, and sort) to delay the functionalities to improve the web performance. For routing, navigating and the `Breadcrumb` component I use [React Router DOM](https://reactrouterdotcom.fly.dev/docs/en/v6). Then for data fetching, state management and error handling I use `useQuery` from [React-Query](https://react-query.tanstack.com/).

For a better web performance, I use `React.useRef` to wrap the debounced functions and store them across renders, so they would not be re-generated on every render.

`Debounce` alternative for small data table ? It should be faster and smoother if we can make the search box only works if we click the search icon button or press `Enter` on keyboard, instead of keep processing the keyword changes with some delay.

Why use `react-query`, not `React.useState` + `React.useEffect`?

- Data fetching: because `react-query` will return the previously fetched data first and then refetch it again, and it will keep both the data as a reference without forcing the page to reload.
- State management and error handling: we don't need to handle some states (data, error, loading) manually, since `react-query`'s useQuery hook can do that for us.


### VSCode Extensions

**Linter**: ESLint

**Code Formatter**: Prettier

I use [ESLint](https://eslint.org/) to help detect syntax and style errors and [Prettier](https://prettier.io/) to take care of my code formatting.


### Links

Link Public Git to this repo: https://github.com/juvilim/Frontend-Web

This project is deployed using Github Pages. Demo link: https://juvilim.github.io/Frontend-Web/example

### Notes

If you want test locally and make changes of the API url/page size/total data return/whatever value, every global constant variables are stored in `/constants/index.tsx`.
