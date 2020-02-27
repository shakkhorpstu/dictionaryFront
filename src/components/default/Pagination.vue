<template>
    <div class="text-center mt-3" v-if="$store.state.pagination.total_item > 1">
        <el-pagination
                background
                layout="prev, pager, next"
                :page-count="$store.state.pagination.last_page"
                @current-change="next">
        </el-pagination>
    </div>

</template>

<script>
    export default {
        name: "Pagination",
        props: {
            action: {
                type: String,
                required: true
            },
            id: {
                required: false
            },
            query: {
                required: false
            }

        },
        data() {
            return {
                page: this.$store.state.pagination.current_page,
            }
        },
        methods: {
            next(event) {
                this.$store.dispatch(this.action, {
                    current_page: event-1,
                    next_page: event,
                    id: this.id,
                    searchKeyword: this.query
                });

            }
        }
    }
</script>

<style scoped>

</style>