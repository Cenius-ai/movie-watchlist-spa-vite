<script setup>
import { useMoviesStore } from '../stores/movies.js'
import { useRouter } from 'vue-router'

const store = useMoviesStore()
const router = useRouter()

function goToDetail(id) {
  router.push({ name: 'movie-detail', params: { id } })
}

function formatDate(isoDate) {
  const d = new Date(isoDate)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function daysAgo(isoDate) {
  const now = new Date()
  const then = new Date(isoDate)
  const diff = Math.floor((now - then) / (1000 * 60 * 60 * 24))
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  if (diff < 7) return `${diff} days ago`
  if (diff < 30) return `${Math.floor(diff / 7)} week${Math.floor(diff / 7) > 1 ? 's' : ''} ago`
  return `${Math.floor(diff / 30)} month${Math.floor(diff / 30) > 1 ? 's' : ''} ago`
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">Watched History</h1>
      <p class="page-subtitle">
        {{ store.watchedCount }} movie{{ store.watchedCount !== 1 ? 's' : '' }} watched
      </p>
    </div>

    <div v-if="store.watchedMovies.length > 0">
      <div
        v-for="movie in store.watchedMovies"
        :key="movie.id"
        class="history-item"
        role="button"
        tabindex="0"
        @click="goToDetail(movie.id)"
        @keydown.enter="goToDetail(movie.id)"
      >
        <div class="history-date">
          <div style="font-weight: 600; color: var(--text-primary);">{{ formatDate(movie.dateWatched) }}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">{{ daysAgo(movie.dateWatched) }}</div>
        </div>
        <div class="history-title">{{ movie.title }}</div>
        <span class="genre-badge">{{ movie.genre }}</span>
        <span style="font-size: 0.8125rem; color: var(--text-muted);">{{ movie.year }}</span>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="empty-state">
      <div class="empty-state-icon">📜</div>
      <div class="empty-state-title">No watched movies yet</div>
      <p class="empty-state-text">Movies you mark as watched will appear here with the date you watched them.</p>
      <router-link to="/" class="btn btn-primary">Go to Watchlist</router-link>
    </div>
  </div>
</template>
