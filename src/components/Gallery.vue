<template>
    <div class="ui segment" v-if="photos.length === 0">Loading...</div>
    <div class="ui segment" v-else>
        <div class="ui list">
            <div v-for="photo in photos" :key="photo.id" class="item" style="cursor: pointer;">
                <router-link v-bind:to="`/gallery/${photo.id}`" exact>
                    <img class="ui image fluid"
                         :src="photo.urls.full"
                         :alt="photo.alt_description"
                    />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
      data() {
        return {
          photos: []
        }
      },
      created() {
        this.fetchPhotos().then(photos => {
          this.photos = photos.data.results;
        })
      },
      methods: {
        async fetchPhotos() {
            return await axios.get('https://api.unsplash.com/search/photos', {
              params: {
                query: "ballons",
                per_page: 5
              },
              headers: {
                Authorization: 'Client-ID cad06ba4eca06b9ae2d390e09fcf35680c9b598fbe24e982a7c526c08f5d6052'
              }
            });
        }
      }
    }
</script>
