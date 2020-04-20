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
      props: ['comments']
    }
</script>
