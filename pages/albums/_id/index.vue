<template>
  <div>
    <block-album-info :album="album" :fields="fields" @albumUpdated="onAlbumUpdated" />
    <hr />
    <block-media-uploader :target="album.id" @mediaUpdated="onMediaUpdated" />
    <b-table
      :per-page="perPage"
      :current-page="currentPage"
      striped
      hover
      :fields="[
        { key: 'type', label: 'Jenis' },
        { key: 'size', label: 'Ukuran' },
        { key: 'originalName', label: 'Nama' },
        { key: 'action', label: 'Aksi', class: 'text-center width-170' },
      ]"
      :items="album.media"
    >
      <template #cell(size)="{ item }">
        {{ prettyBytes(item.size) }}
      </template>
      <template #cell(action)="{ item }">
        <modal-show-media
          v-if="$can('Show Media')"
          class="d-inline-block"
          :media="item"
        />
        <b-button
          v-if="$can('Delete Media')"
          variant="danger"
          size="sm"
          @click.prevent="deleteMedia(item.id)"
          >Hapus</b-button
        >
      </template>
    </b-table>
    <div class="p-3">
      <b-pagination
        v-model="currentPage"
        :total-rows="album.media.length"
        :per-page="perPage"
        align="center"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import prettyBytes from 'pretty-bytes'
export default {
  props: {
    album: {
      type: Object,
      default: () => ({}),
    },
    fields: {
      type: Array,
      default: () => [],
    },
  },
  head() {
    return {
      title: 'Album - ' + this.album.name,
    }
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
    }
  },
  methods: {
    prettyBytes(b) {
      return prettyBytes(b)
    },
    onMediaUpdated(media) {
      this.$emit('mediaUpdated', media)
    },
    onAlbumUpdated(album) {
      this.$emit('albumUpdated', album)
    },
    async deleteMedia(id) {
      const res = await this.$deleteConfirm(
        'Anda yakin ingin menghapus media ini?'
      )
      if (!res) return true
      try {
        const media = await this.$axios.$delete('/media/' + id)
        this.$emit('mediaUpdated', media)
      } catch (e) {
        this.$sw('Gagal menghapus media', this.$errorMessage(e))
      }
    },
  },
}
</script>
