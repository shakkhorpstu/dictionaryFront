<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>User List</span>
            <v-btn style="float: right;" small rounded tile outlined :color="color.addButton" :to="{name: 'users.create'}">
                <v-icon left>mdi-plus-circle-outline</v-icon> Create
            </v-btn>
        </div>
        <el-table :data="users" style="width: 100%" v-loading="$store.state.pageLoading">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="Name"
                    prop="first_name">
            </el-table-column>
            <el-table-column
                    label="Email"
                    prop="email">
            </el-table-column>
            <el-table-column
                    label="Phone"
                    prop="phone_no">
            </el-table-column>
            <el-table-column
                    label="Country"
                    prop="country.name">
            </el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="searchKeyword"
                            size="mini"
                            placeholder="Type to search"></el-input>
                </template>
                <template slot-scope="scope">
                    <v-btn class="mx-2" dark small :color="color.editButton" :to="{name: 'users.edit', params: {id: scope.row.id}}">
                        <v-icon dark small>edit</v-icon>
                    </v-btn>
                    <v-btn class="mx-2" dark small :color="color.deleteButton" @click="deletePopup(scope.row)">
                        <v-icon dark small>delete</v-icon>
                    </v-btn>
                    <div v-if="$store.state.deleteDialog">
                        <DeletePopup :item="item" action="ACT_DELETE_USER" />
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :action="searchKeyword ? 'ACT_SEARCH_USERS' : 'ACT_ALL_USERS'" :query="searchKeyword" />
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

    export default {
        name: "Index",
        metaInfo: {
            titleTemplate: 'User | Dashboard | Faton',
        },
        components: {
            Pagination,
            DeletePopup,
        },
        data() {
            return {
                color: color,
                searchKeyword: '',
                item: {
                    profile: {}
                },
                formLabelWidth: '90px',
                dialogTitle: ''
            }
        },
        created() {
            this.$store.dispatch('ACT_ALL_USERS', {
                current_page: 1,
                next_page: 1
            });
        },
        methods: {
            deletePopup(row) {
                this.item = row;
                this.$store.state.deleteDialog = true;
            }
        },
        computed: {
            ...mapGetters({
                users : 'GET_ALL_USER_DATA',
            })
        },
        watch: {
            searchKeyword: function(val) {
                this.$store.dispatch('ACT_SEARCH_USERS', {
                    current_page: 1,
                    next_page: 1,
                    searchKeyword: val
                });
            }
        }
    }
</script>

<style>
    .el-dialog__body {
        padding-bottom: 0px !important;
    }
</style>