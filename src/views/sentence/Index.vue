<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>Sentence List</span>
            <v-btn to="/sentences/add" style="float: right;" small rounded tile outlined :color="color.addButton">
                <v-icon left>mdi-plus-circle-outline</v-icon> Create
            </v-btn>
        </div>
        <el-table :data="sentences" style="width: 100%" v-loading="$store.state.pageLoading">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="Name"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="Chapter"
                    prop="chapter.name">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="searchKeyword"
                            size="mini"
                            placeholder="Type to search"></el-input>
                </template>
                <template slot-scope="scope">
                    <v-btn class="mx-2" dark small :color="color.viewButton" @click="viewItem(scope.row)">
                        <v-icon dark small>remove_red_eye</v-icon>
                    </v-btn>
                    <v-btn class="mx-2" dark small :color="color.editButton" :to="{name: 'sentences.edit', params: {id: scope.row.id}}">
                        <v-icon dark small>edit</v-icon>
                    </v-btn>
                    <v-btn class="mx-2" dark small :color="color.deleteButton" @click="deletePopup(scope.row)">
                        <v-icon dark small>delete</v-icon>
                    </v-btn>
                    <div v-if="$store.state.deleteDialog">
                        <DeletePopup :item="item" action="ACT_DELETE_SENTENCE" />
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :action="searchKeyword ? 'ACT_SEARCH_SENTENCES' : 'ACT_ALL_SENTENCES'" :query="searchKeyword" />
        <Details :item="item" />
        <v-snackbar v-model="$store.state.snackbar" left>
            {{ $store.state.notificationMessage }}
        </v-snackbar>
    </el-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import color from '../../plugins/colors';
    import Pagination from "../../components/default/Pagination";
    import DeletePopup from "../../components/default/DeletePopup";
    import Details from '../../components/sentence/Details';

    export default {
        name: "Index",
        metaInfo: {
            titleTemplate: 'Sentence | Dashboard | Faton',
        },
        components: {
            Pagination,
            DeletePopup,
            Details
        },
        data() {
            return {
                color: color,
                searchKeyword: '',
                item: {}
            }
        },
        created() {
            this.$store.dispatch('ACT_ALL_SENTENCES', {
                current_page: 1,
                next_page: 1
            });
        },
        methods: {
            deletePopup(row) {
                this.item = row;
                this.$store.state.deleteDialog = true;
            },
            viewItem(row) {
                this.item = row;
                this.$store.state.detailsDialogVisible = true;
            }
        },
        computed: {
            ...mapGetters({
                sentences : 'GET_ALL_SENTENCE_DATA'
            })
        },
        watch: {
            searchKeyword: function(val) {
                this.$store.dispatch('ACT_SEARCH_SENTENCES', {
                    current_page: 1,
                    next_page: 1,
                    searchKeyword: val
                });
            }
        }
    }
</script>

<style scoped>

</style>