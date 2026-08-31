<script setup>
import { useMoviesStore } from './stores/movies.js'

const store = useMoviesStore()
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <router-link to="/" class="header-brand">
        <span class="header-brand-icon">🎬</span>
        CineList
      </router-link>
      <nav class="nav-links">
        <router-link to="/" class="nav-link">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <path d="M2 4h12M2 8h12M2 12h12"/>
          </svg>
          Watchlist
          <span v-if="store.unwatchedCount" class="genre-badge" style="margin-left: 2px;">{{ store.unwatchedCount }}</span>
        </router-link>
        <router-link to="/add" class="nav-link">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <path d="M8 3v10M3 8h10"/>
          </svg>
          Add
        </router-link>
        <router-link to="/watched" class="nav-link">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 8.5L6 11l7-6"/>
            <rect x="1" y="1" width="14" height="14" rx="3"/>
          </svg>
          History
        </router-link>
      </nav>
    </div>
  </header>

  <main class="app-shell">
    <router-view />
  </main>
</template>
