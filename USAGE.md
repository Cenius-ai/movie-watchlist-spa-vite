# Using the Movie Watchlist App

After starting the development server (`npm run dev`), open `http://localhost:5173` in your browser. The app consists of four main pages:

## Pages

### Watchlist (`/`)

Displays all movies you’ve added, with their title, genre, and release year. Each movie card includes a button to mark it as watched. The watchlist is initially populated with demo movies from `src/data/seed.js`.

### Add a Movie (`/add`)

A form (`src/views/AddMoviePage.vue`) where you can enter a movie title, genre, and release year. Submitting the form adds the movie to the watchlist and navigates back to the home page.

### Movie Details (`/movie/:id`)

Clicking on a movie in the watchlist takes you to its detail page (`src/views/MovieDetailPage.vue`). Here you can see all the information about the movie and a button to mark it as watched (if it isn’t already).

### Watched History (`/watched`)

The history page (`src/views/WatchedHistoryPage.vue`) lists every movie you have marked as watched. From here you can revisit the movie’s details, or remove individual entries from the history.

## Data Persistence

All movie data is stored in the browser’s `localStorage` via a Pinia store (`src/stores/movies.js`). The app loads the demo seed data only when the store is empty, so your own additions and watched markers persist across browser sessions.

## Example Walkthrough

1. Open the app. The watchlist shows three demo movies.
2. Click **+ Add Movie** in the navigation (or go to `/add`).
3. Fill in the form and click **Add**. You are redirected back to the watchlist, which now includes your new movie.
4. Click on the new movie to open its detail page, then click **Mark as Watched**.
5. Navigate to **Watched History** (`/watched`). The movie appears in the list.
6. Going back to the watchlist, the movie is no longer shown there.

## Command Line Examples

Since the app is an SPA, all routes return the same `index.html`. You can verify that the development server is running with curl:

```bash
curl -s http://localhost:5173/ | head -n 1
```

This should output the beginning of the HTML shell. Navigating to any route (`/add`, `/watched`, etc.) returns the same shell; Vue Router then mounts the correct view component.