import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import seedMovies from '../data/seed.js'

const STORAGE_KEY = 'cinelist-movies'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch {
    // Corrupted storage — fall through to seed
  }
  return null
}

function saveToStorage(movies) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies))
  } catch {
    // Storage full or unavailable — silently degrade
  }
}

export const useMoviesStore = defineStore('movies', () => {
  // Initialize from localStorage, falling back to seed data
  const stored = loadFromStorage()
  const movies = ref(stored !== null ? stored : [...seedMovies])

  // If we seeded, persist immediately
  if (stored === null) {
    saveToStorage(movies.value)
  }

  // Auto-sync to localStorage on any change
  watch(movies, (val) => {
    saveToStorage(val)
  }, { deep: true })

  // --- Getters ---

  const watchlist = computed(() =>
    movies.value.filter((m) => !m.watched)
  )

  const watchedMovies = computed(() =>
    movies.value
      .filter((m) => m.watched && m.dateWatched)
      .sort((a, b) => new Date(b.dateWatched) - new Date(a.dateWatched))
  )

  const totalCount = computed(() => movies.value.length)
  const watchedCount = computed(() => movies.value.filter((m) => m.watched).length)
  const unwatchedCount = computed(() => movies.value.filter((m) => !m.watched).length)

  function getById(id) {
    return movies.value.find((m) => m.id === id) || null
  }

  // --- Actions ---

  function addMovie(movieData) {
    const id = 'm' + Date.now() + '-' + Math.random().toString(36).slice(2, 8)
    const movie = {
      id,
      title: movieData.title.trim(),
      year: Number(movieData.year),
      genre: movieData.genre.trim(),
      director: movieData.director.trim(),
      plot: movieData.plot.trim(),
      posterUrl: (movieData.posterUrl || '').trim(),
      watched: false,
      dateWatched: null
    }
    movies.value.push(movie)
    return movie
  }

  function toggleWatched(id) {
    const movie = movies.value.find((m) => m.id === id)
    if (!movie) return

    if (movie.watched) {
      movie.watched = false
      movie.dateWatched = null
    } else {
      movie.watched = true
      movie.dateWatched = new Date().toISOString().split('T')[0]
    }
  }

  function removeMovie(id) {
    const idx = movies.value.findIndex((m) => m.id === id)
    if (idx !== -1) {
      movies.value.splice(idx, 1)
    }
  }

  function updateMovie(id, updates) {
    const movie = movies.value.find((m) => m.id === id)
    if (!movie) return

    if (updates.title !== undefined) movie.title = updates.title.trim()
    if (updates.year !== undefined) movie.year = Number(updates.year)
    if (updates.genre !== undefined) movie.genre = updates.genre.trim()
    if (updates.director !== undefined) movie.director = updates.director.trim()
    if (updates.plot !== undefined) movie.plot = updates.plot.trim()
    if (updates.posterUrl !== undefined) movie.posterUrl = updates.posterUrl.trim()
  }

  return {
    movies,
    watchlist,
    watchedMovies,
    totalCount,
    watchedCount,
    unwatchedCount,
    getById,
    addMovie,
    toggleWatched,
    removeMovie,
    updateMovie
  }
})
