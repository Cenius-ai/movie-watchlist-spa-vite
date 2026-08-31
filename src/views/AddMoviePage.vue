<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useMoviesStore } from '../stores/movies.js'

const router = useRouter()
const store = useMoviesStore()

const form = reactive({
  title: '',
  year: new Date().getFullYear(),
  genre: '',
  director: '',
  plot: '',
  posterUrl: ''
})

const errors = ref({})
const submitted = ref(false)

const genres = [
  'Action', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi',
  'Thriller', 'War', 'Western', 'Mystery', 'Adventure'
]

function validate() {
  const e = {}
  if (!form.title.trim()) e.title = 'Title is required'
  if (!form.year || form.year < 1888 || form.year > new Date().getFullYear() + 5) {
    e.year = 'Enter a valid year'
  }
  if (!form.genre) e.genre = 'Select a genre'
  if (!form.director.trim()) e.director = 'Director is required'
  if (!form.plot.trim()) e.plot = 'Plot summary is required'
  else if (form.plot.trim().length < 20) e.plot = 'Plot should be at least 20 characters'
  errors.value = e
  return Object.keys(e).length === 0
}

function handleSubmit() {
  submitted.value = true
  if (!validate()) return

  store.addMovie({
    title: form.title,
    year: form.year,
    genre: form.genre,
    director: form.director,
    plot: form.plot,
    posterUrl: form.posterUrl
  })

  // Reset form
  form.title = ''
  form.year = new Date().getFullYear()
  form.genre = ''
  form.director = ''
  form.plot = ''
  form.posterUrl = ''
  errors.value = {}
  submitted.value = false

  router.push({ name: 'watchlist' })
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">Add a Movie</h1>
      <p class="page-subtitle">Fill in the details for a movie you want to watch</p>
    </div>

    <form @submit.prevent="handleSubmit" novalidate>
      <!-- Title -->
      <div class="form-group">
        <label class="form-label" for="title">Title</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          class="form-input"
          :class="{ 'form-input-error': submitted && errors.title }"
          placeholder="e.g. The Grand Budapest Hotel"
          maxlength="200"
        />
        <p v-if="submitted && errors.title" class="form-hint" style="color: var(--error);">{{ errors.title }}</p>
      </div>

      <!-- Year & Genre row -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md);">
        <div class="form-group">
          <label class="form-label" for="year">Year</label>
          <input
            id="year"
            v-model.number="form.year"
            type="number"
            class="form-input"
            :class="{ 'form-input-error': submitted && errors.year }"
            min="1888"
            :max="new Date().getFullYear() + 5"
            placeholder="2024"
          />
          <p v-if="submitted && errors.year" class="form-hint" style="color: var(--error);">{{ errors.year }}</p>
        </div>

        <div class="form-group">
          <label class="form-label" for="genre">Genre</label>
          <select
            id="genre"
            v-model="form.genre"
            class="form-select"
            :class="{ 'form-input-error': submitted && errors.genre }"
          >
            <option value="" disabled>Select a genre…</option>
            <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
          </select>
          <p v-if="submitted && errors.genre" class="form-hint" style="color: var(--error);">{{ errors.genre }}</p>
        </div>
      </div>

      <!-- Director -->
      <div class="form-group">
        <label class="form-label" for="director">Director</label>
        <input
          id="director"
          v-model="form.director"
          type="text"
          class="form-input"
          :class="{ 'form-input-error': submitted && errors.director }"
          placeholder="e.g. Wes Anderson"
          maxlength="100"
        />
        <p v-if="submitted && errors.director" class="form-hint" style="color: var(--error);">{{ errors.director }}</p>
      </div>

      <!-- Plot -->
      <div class="form-group">
        <label class="form-label" for="plot">Plot Summary</label>
        <textarea
          id="plot"
          v-model="form.plot"
          class="form-textarea"
          :class="{ 'form-input-error': submitted && errors.plot }"
          placeholder="Brief description of the movie's story…"
          maxlength="1000"
          rows="4"
        ></textarea>
        <p v-if="submitted && errors.plot" class="form-hint" style="color: var(--error);">{{ errors.plot }}</p>
        <p v-else class="form-hint">{{ form.plot.length }} / 1000 characters</p>
      </div>

      <!-- Poster URL -->
      <div class="form-group">
        <label class="form-label" for="posterUrl">Poster URL <span style="font-weight: 400; text-transform: none; letter-spacing: 0;">(optional)</span></label>
        <input
          id="posterUrl"
          v-model="form.posterUrl"
          type="url"
          class="form-input"
          placeholder="https://example.com/poster.jpg"
        />
      </div>

      <!-- Submit -->
      <div style="display: flex; gap: var(--space-sm); margin-top: var(--space-xl);">
        <button type="submit" class="btn btn-primary btn-lg">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <path d="M8 3v10M3 8h10"/>
          </svg>
          Add to Watchlist
        </button>
        <router-link to="/" class="btn btn-secondary btn-lg">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-input-error {
  border-color: var(--error) !important;
}
.form-input-error:focus {
  box-shadow: 0 0 0 3px oklch(0.55 0.19 22 / 0.15) !important;
}
</style>
