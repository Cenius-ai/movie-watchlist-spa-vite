import { createRouter, createWebHistory } from 'vue-router'
import WatchlistPage from '../views/WatchlistPage.vue'
import MovieDetailPage from '../views/MovieDetailPage.vue'
import AddMoviePage from '../views/AddMoviePage.vue'
import WatchedHistoryPage from '../views/WatchedHistoryPage.vue'

const routes = [
  { path: '/', name: 'watchlist', component: WatchlistPage },
  { path: '/movie/:id', name: 'movie-detail', component: MovieDetailPage },
  { path: '/add', name: 'add-movie', component: AddMoviePage },
  { path: '/watched', name: 'watched-history', component: WatchedHistoryPage },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: WatchlistPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
