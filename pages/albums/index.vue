<template>
  <div class="p-3">
    <div class="card shadow-sm">
      <div class="card-header d-flex">
        <div class="my-auto">Daftar Album</div>
        <modal-create-album
          v-if="$can('Create Album')"
          :fields="fields"
          class="my-auto ml-auto"
          @onCreated="onAlbumCreated"
        />
      </div>
      <block-album-table :albums="albums" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumsPage',
  middleware: ['auth'],
  head() {
    return {
      title: 'Album',
    }
  },
  async asyncData({ $axios }) {
    const albums = await $axios.$get('/albums')
    const fields = await $axios.$get('/fields')
    return {
      albums,
      fields
    }
  },
  methods: {
    onAlbumCreated(album) {
      this.albums = [...this.albums, album]
    },
  },
}
</script>
