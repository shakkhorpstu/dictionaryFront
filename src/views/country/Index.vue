<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>Country List</span>
            <v-btn style="float: right;" small rounded tile outlined :color="color.addButton" @click="createItem">
                <v-icon left>mdi-plus-circle-outline</v-icon> Create
            </v-btn>
        </div>
        <el-table :data="countries" style="width: 100%" v-loading="$store.state.pageLoading">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="Name"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="Code"
                    prop="code">
            </el-table-column>
            <el-table-column
                    label="Phone Code"
                    prop="phone_code">
            </el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="searchKeyword"
                            size="mini"
                            placeholder="Type to search"></el-input>
                </template>
                <template slot-scope="scope">
                    <v-btn class="mx-2" dark small :color="color.editButton" @click="editItem(scope.row)">
                        <v-icon dark small>edit</v-icon>
                    </v-btn>
                    <v-btn class="mx-2" dark small :color="color.deleteButton" @click="deletePopup(scope.row)">
                        <v-icon dark small>delete</v-icon>
                    </v-btn>
                    <div v-if="$store.state.deleteDialog">
                        <DeletePopup :item="item" action="ACT_DELETE_COUNTRY" />
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :action="searchKeyword ? 'ACT_SEARCH_COUNTRIES' : 'ACT_ALL_COUNTRIES'" :query="searchKeyword" />
        <!--Form-->
        <el-dialog
                :title="dialogTitle"
                :visible.sync="$store.state.createDialogVisible"
                width="30%">
            <el-form :model="item">
                <el-form-item label="Name" :label-width="formLabelWidth">
                    <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="Code" :label-width="formLabelWidth">
                    <el-input v-model="item.code"></el-input>
                </el-form-item>
                <el-form-item label="Phone Code" :label-width="formLabelWidth">
                    <el-input v-model="item.phone_code"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submit">Submit</el-button>
                </span>
        </el-dialog>
        <!--Form-->
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
            titleTemplate: 'Country | Dashboard | Faton',
        },
        components: {
            Pagination,
            DeletePopup,
        },
        data() {
            return {
                color: color,
                searchKeyword: '',
                item: {},
                formLabelWidth: '90px',
                dialogTitle: ''
            }
        },
        created() {
            this.$store.dispatch('ACT_ALL_COUNTRIES', {
                current_page: 1,
                next_page: 1
            });
        },
        methods: {
            deletePopup(row) {
                this.item = row;
                this.$store.state.deleteDialog = true;
            },
            createItem() {
                this.dialogTitle = 'Create Country';
                this.$store.state.createDialogVisible = true;
            },
            editItem(row) {
                this.dialogTitle = 'Edit Country';
                this.item = row;
                this.$store.state.createDialogVisible = true;
            },
            submit(){
                let action;
                if(this.dialogTitle == 'Create Country') {
                    action = 'ACT_STORE_COUNTRY';
                } else {
                    action = 'ACT_UPDATE_COUNTRY';
                }
                this.$store.dispatch(action, this.item);
            }
        },
        computed: {
            ...mapGetters({
                countries : 'GET_ALL_COUNTRY_DATA'
            })
        },
        watch: {
            searchKeyword: function(val) {
                this.$store.dispatch('ACT_SEARCH_COUNTRIES', {
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