<script setup>
import { useMoviesStore } from '../stores/movies.js'
import { useRouter } from 'vue-router'

const store = useMoviesStore()
const router = useRouter()

function goToDetail(id) {
  router.push({ name: 'movie-detail', params: { id } })
}

function markWatched(id, e) {
  e.stopPropagation()
  store.toggleWatched(id)
}

function removeMovie(id, e) {
  e.stopPropagation()
  store.removeMovie(id)
}

function getGenreInitials(genre) {
  return genre.split(/[\s-]+/).map(w => w[0]).join('').slice(0, 3).toUpperCase()
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">Your Watchlist</h1>
      <p class="page-subtitle">
        {{ store.unwatchedCount }} movie{{ store.unwatchedCount !== 1 ? 's' : '' }} to watch
      </p>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-card-value">{{ store.totalCount }}</div>
        <div class="stat-card-label">Total</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-value">{{ store.unwatchedCount }}</div>
        <div class="stat-card-label">To Watch</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-value">{{ store.watchedCount }}</div>
        <div class="stat-card-label">Watched</div>
      </div>
    </div>

    <!-- Movie list -->
    <div v-if="store.watchlist.length > 0" class="movie-list">
      <div
        v-for="movie in store.watchlist"
        :key="movie.id"
        class="movie-card"
        role="button"
        tabindex="0"
        @click="goToDetail(movie.id)"
        @keydown.enter="goToDetail(movie.id)"
      >
        <div class="movie-card-poster">
          <img v-if="movie.posterUrl" :src="movie.posterUrl" :alt="movie.title + ' poster'" />
          <div v-else class="movie-card-poster-placeholder">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.4">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            <span>{{ getGenreInitials(movie.genre) }}</span>
          </div>
        </div>

        <div class="movie-card-body">
          <div class="movie-card-title">{{ movie.title }}</div>
          <div class="movie-card-meta">
            <span>{{ movie.year }}</span>
            <span>·</span>
            <span class="genre-badge">{{ movie.genre }}</span>
            <span>·</span>
            <span>{{ movie.director }}</span>
          </div>
          <p class="movie-card-plot">{{ movie.plot }}</p>
          <div class="movie-card-actions">
            <button class="btn btn-success btn-sm" @click="markWatched(movie.id, $event)">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 8.5L6 11l7-6"/>
              </svg>
              Mark Watched
            </button>
            <button class="btn btn-outline btn-sm" @click="removeMovie(movie.id, $event)">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M13 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V4"/>
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="empty-state">
      <div class="empty-state-icon">🎥</div>
      <div class="empty-state-title">Your watchlist is empty</div>
      <p class="empty-state-text">All caught up! Add a new movie to get started.</p>
      <router-link to="/add" class="btn btn-primary">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <path d="M8 3v10M3 8h10"/>
        </svg>
        Add a Movie
      </router-link>
    </div>
  </div>
</template>
