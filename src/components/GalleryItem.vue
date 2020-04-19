<template>
    <div class="ui segment" v-if="photoData === null">Fetching photo...</div>
    <div v-else class="ui raised very padded text container segment" style="margin-bottom: 20px;">
        <h2 class="ui header centered">
            {{(photoData.description !== null) ? photoData.description : "No Title"}}
        </h2>
        <img class="ui image centered large"
             :src="photoData.urls.full"
             :alt="photoData.alt_description"
        />
        <comment-section></comment-section>
    </div>
</template>

<script>
    import axios from 'axios';
    import CommentSection from './CommentSection.vue';

    export default {
      components: {
        commentSection: CommentSection
      },
      data() {
        return {
          photoId: this.$route.params.photoId,
          photoData: null
        }
      },
      created() {
        this.fetchPhoto().then(photo => {
          this.photoData = photo.data
        });
      },
      methods: {
        async fetchPhoto() {
          return await axios.get(
            `https://api.unsplash.com/photos/${this.photoId}`,
            {
              headers: {
                Authorization: 'Client-ID cad06ba4eca06b9ae2d390e09fcf35680c9b598fbe24e982a7c526c08f5d6052'
              }
            }
          );
        }
      }
    }
</script>
