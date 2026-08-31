<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMoviesStore } from '../stores/movies.js'

const route = useRoute()
const router = useRouter()
const store = useMoviesStore()

const movie = computed(() => store.getById(route.params.id))

function goBack() {
  router.push({ name: 'watchlist' })
}

function toggleWatched() {
  if (movie.value) {
    store.toggleWatched(movie.value.id)
  }
}

function removeMovie() {
  if (movie.value) {
    store.removeMovie(movie.value.id)
    router.push({ name: 'watchlist' })
  }
}

function getGenreInitials(genre) {
  return genre.split(/[\s-]+/).map(w => w[0]).join('').slice(0, 3).toUpperCase()
}
</script>

<template>
  <div class="page">
    <!-- Not found -->
    <div v-if="!movie" class="empty-state">
      <div class="empty-state-icon">🔍</div>
      <div class="empty-state-title">Movie not found</div>
      <p class="empty-state-text">This movie may have been removed or the link is invalid.</p>
      <router-link to="/" class="btn btn-primary">Back to Watchlist</router-link>
    </div>

    <template v-else>
      <button class="back-link" @click="goBack">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 3L5 8l5 5"/>
        </svg>
        Back to Watchlist
      </button>

      <div class="detail-header">
        <div class="detail-poster">
          <img v-if="movie.posterUrl" :src="movie.posterUrl" :alt="movie.title + ' poster'" />
          <div v-else class="detail-poster-placeholder">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.3">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            <span>{{ getGenreInitials(movie.genre) }}</span>
          </div>
        </div>

        <div class="detail-info">
          <h1 class="detail-title">{{ movie.title }}</h1>

          <span
            class="watched-badge"
            :class="movie.watched ? 'watched' : 'unwatched'"
          >
            {{ movie.watched ? '✓ Watched' : '○ To Watch' }}
          </span>

          <div v-if="movie.watched && movie.dateWatched" style="margin-top: 8px; font-size: 0.8125rem; color: var(--text-muted);">
            Watched on {{ new Date(movie.dateWatched).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </div>
        </div>
      </div>

      <!-- Metadata grid -->
      <div class="detail-meta-grid">
        <div class="detail-meta-item">
          <div class="detail-meta-label">Year</div>
          <div class="detail-meta-value">{{ movie.year }}</div>
        </div>
        <div class="detail-meta-item">
          <div class="detail-meta-label">Genre</div>
          <div class="detail-meta-value">
            <span class="genre-badge">{{ movie.genre }}</span>
          </div>
        </div>
        <div class="detail-meta-item">
          <div class="detail-meta-label">Director</div>
          <div class="detail-meta-value">{{ movie.director }}</div>
        </div>
      </div>

      <!-- Plot -->
      <div class="detail-plot">
        <p>{{ movie.plot }}</p>
      </div>

      <!-- Actions -->
      <div class="detail-actions">
        <button
          class="btn"
          :class="movie.watched ? 'btn-outline' : 'btn-success'"
          @click="toggleWatched"
        >
          <svg v-if="movie.watched" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M2 8l4 4 8-8"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 8.5L6 11l7-6"/>
          </svg>
          {{ movie.watched ? 'Mark Unwatched' : 'Mark Watched' }}
        </button>

        <button class="btn btn-outline" @click="removeMovie" style="color: var(--error); border-color: oklch(0.55 0.19 22 / 0.3);">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M13 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V4"/>
          </svg>
          Remove Movie
        </button>
      </div>
    </template>
  </div>
</template>
