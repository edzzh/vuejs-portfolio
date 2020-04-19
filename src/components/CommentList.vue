<template>
    <div>
        <div v-if="comments.length === 0">No Comments Found...</div>
        <div v-else class="comment" v-for="comment in comments" :key="comment.key">
            <div class="content">
                <a class="author">{{comment.username}}</a>
                <div class="metadata">
                <span class="date">{{comment.timestamp}}</span>
                </div>
                <div class="text">
                    {{comment.comment}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      props: ['comments'],
      watch: {
        comments: function (newValue, oldValue) {
          console.log(newValue);
          console.log(oldValue);
        }
      }
      // data() {
      //   return {
      //     propComments: this.comments
      //   }
      // },
      // created() {
      //   this.propComments.sort((a, b) => {
      //     let dateA = new Date(a.timestamp);
      //     let dateB = new Date(b.timestamp);
      //
      //     return dateB.getTime() - dateA.getTime();
      //   });
      // }
    }
</script>
