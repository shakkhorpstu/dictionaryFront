<template>
        <v-dialog v-model="$store.state.deleteDialog" max-width="290">
                <v-card>
                        <v-card-title>
                                Are you sure?
                        </v-card-title>

                        <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="error" @click="deleteItem">
                                    Yes
                                </v-btn>
                        </v-card-actions>
                </v-card>
        </v-dialog>
</template>

<script>
    export default {
        name: "DeletePopup",
        props: ['item', 'action'],
        methods: {
             deleteItem() {
                 this.$store.dispatch(this.action, this.item.id);
             }
        }
    }
</script>

<style scoped>

</style>