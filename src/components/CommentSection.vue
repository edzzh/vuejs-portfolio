<template>
    <div class="ui comments">
        <form class="ui reply form">
            <div class="ui input labeled field">
                <div class="ui label black">
                    Username:
                </div>
                <input type="text"
                       name="username"
                       id="username"
                       v-model.lazy="commentData.username"
                />
            </div>
            <div class="field">
                <textarea
                        name="comment"
                        id="comment"
                        v-model.lazy="commentData.comment"
                >
                </textarea>
            </div>
            <button class="ui blue labeled submit icon button"
                    @click.prevent="submitForm"
            >
                <i class="icon edit"/> Add Comment
            </button>
        </form>
        <h3 class="ui dividing header">Comments</h3>
        <comment-list v-bind:comments="comments"></comment-list>
    </div>
</template>

<script>
    import firebase from '../firebase';
    import CommentList from './CommentList.vue';

    export default {
      components: {
        commentList: CommentList
      },
      data() {
        return {
          databaseRef: firebase.firestore().collection('comments'),
          commentData: {
            username: '',
            comment: ''
          },
          comments: []
        }
      },
      created() {
        this.fetchComments();
      },
      methods: {
        async fetchComments() {
          const fetchedComments = [];
          const querySnapshot = await this.databaseRef.get();

          querySnapshot.forEach((doc) => {
            const { username, comment, timestamp, photo_id } = doc.data();

            if (photo_id === this.$route.params.photoId) {
              fetchedComments.push({
                key: doc.id,
                username,
                comment,
                timestamp
              });
            }
          });

          this.comments = this.sortCommentsByDate(fetchedComments);
        },
        async submitForm() {
          const { username, comment } = this.commentData;
          const photo_id = this.$route.params.photoId;
          const timestamp = new Date().toLocaleString();

          if (username !== '' && comment !== '') {
            try {
              await this.databaseRef.add({
                username,
                comment,
                photo_id,
                timestamp
              });

              this.commentData.username = '';
              this.commentData.comment = '';

              await this.fetchComments();
            } catch (error) {
              console.error("Error adding document: ", error);
            }
          }
        },
        sortCommentsByDate(comments) {
          return comments.sort((a, b) => {
            let dateA = new Date(a.timestamp);
            let dateB = new Date(b.timestamp);

            return dateB.getTime() - dateA.getTime();
          });
        }
      }
    }
</script>
