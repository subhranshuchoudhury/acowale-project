# News App

This is a news application built using React and GNews API. The app displays the latest news articles based on the selected country and search term. Users can filter news by country, search for specific articles, and browse through pages of news using the pagination feature.

## Features

- Country selector for fetching news based on region.
- Search functionality to find articles by keywords.
- Pagination to navigate through the articles.
- Responsive design using CSS.
- API integration with GNews to fetch top headlines.

## Technologies Used

- **React**: For building the user interface.
- **Axios**: For making API calls to GNews.
- **CSS**: responsive styling.
- **Tailwind** : I know but not used :)
- **Next.js**: For server-side rendering and routing.
- **GNews API**: To fetch news articles based on the selected country and search term.
- **Express JS**: To create the Backend APIs & communicate with frontend.
- **Node JS**: The runtime environment of our project.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/subhranshuchoudhury/acowale-project
   ```

2. Frontend directory:

   ```bash
   cd frontend_acowale
   ```

3. Backend directory:

   ```bash
   cd backend_acowale
   ```

4. Add .env:

   ```bash
   VITE_BACKEND_API=
   ```

5. Install dependency: (Both directory)

   ```bash
   yarn or yarn install
   ```

## Start Application (Backend)

1. Run:

   ```bash
   node index.js
   ```

## Start Application (Frontend)

1. Development:

   ```bash
   yarn dev
   ```

2. Build:

   ```bash
   yarn build
   ```

## Approach

The application is designed with simplicity in mind, allowing users to search for news articles based on their chosen country and search terms. The following steps outline the overall approach:

### Component Structure

I broke down the UI into reusable components, like the NewsCard for displaying individual articles.

### API Integration

GNews API is used for fetching news articles. Axios is used to make API calls, and the results are displayed on the UI.

### Pagination

The pagination logic is implemented to allow users to browse through different pages of news articles. Each page fetches a new set of articles from the API based on the selected country and search term.

### Responsiveness

Basic CSS is used to ensure that the app is responsive across different screen sizes. Though I am familiar with Tailwind CSS, I opted for plain CSS in this project to keep things simple.

## Challenges and Solutions

### Pagination

Initially, handling pagination with the GNews API was challenging as it doesn't natively support pagination. I had to manage pagination on the client side by tracking the current page and offsetting the API requests accordingly.

### API Request Limits

GNews API imposes a limit on the number of requests you can make. To handle this, I optimized API calls by storing results and avoiding repeated requests unless the user changes the country or search term.

### Search and Filtering

Ensuring the correct behavior of the search functionality while filtering by country was another challenge. The solution was to refetch news articles every time the country or search term changed, using useEffect to manage this behavior efficiently.

### Future Enhancements

#### Tailwind CSS:

I am familiar with Tailwind and may refactor the CSS into Tailwind in the future for a more scalable design system.
Debounced Search: Implementing debounced search functionality to reduce API calls when the user types in the search bar.
Better Error Handling: Adding user-friendly error messages and better handling of API failures.

#### Backend:

We can separate the route folder, middleware & controllers for better code readability & maintainability. As we have few API end point so we declared it on the index.js file.

### Developer

- Name: Subhranshu Choudhury
- Mobile: +91 8249587552
- Email: subhransuchoudhury00@gmail.com
