<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>Page List</span>
            <v-btn to="/pages/add" style="float: right;" small rounded tile outlined :color="color.addButton">
                <v-icon left>mdi-plus-circle-outline</v-icon> Create
            </v-btn>
        </div>
        <el-table :data="pages" style="width: 100%" v-loading="$store.state.pageLoading">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="Title"
                    prop="title">
            </el-table-column>
            <el-table-column
                    label="Description"
                    width="180">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p v-html="scope.row.body"></p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">Body</el-tag>
                        </div>
                    </el-popover>
                </template>
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
                    <v-btn class="mx-2" dark small :color="color.editButton" :to="{name: 'pages.edit', params: {id: scope.row.id}}">
                        <v-icon dark small>edit</v-icon>
                    </v-btn>
                    <v-btn class="mx-2" dark small :color="color.deleteButton" @click="deletePopup(scope.row)">
                        <v-icon dark small>delete</v-icon>
                    </v-btn>
                    <div v-if="$store.state.deleteDialog">
                        <DeletePopup :item="item" action="ACT_DELETE_PAGE" />
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :action="searchKeyword ? 'ACT_SEARCH_PAGES' : 'ACT_ALL_PAGES'" :query="searchKeyword" />
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
    import Details from '../../components/page/Details';

    export default {
        name: "Index",
        metaInfo: {
            titleTemplate: 'Page | Dashboard | Faton',
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
                item: {},
            }
        },
        created() {
            this.$store.dispatch('ACT_ALL_PAGES', {
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
                pages : 'GET_ALL_PAGE_DATA'
            })
        },
        watch: {
            searchKeyword: function(val) {
                this.$store.dispatch('ACT_SEARCH_PAGES', {
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