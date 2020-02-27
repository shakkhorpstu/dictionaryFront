<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>Role List</span>
            <v-btn style="float: right;" small rounded tile outlined :color="color.addButton" @click="createItem">
                <v-icon left>mdi-plus-circle-outline</v-icon> Create
            </v-btn>
        </div>
        <el-table :data="roles" style="width: 100%" v-loading="$store.state.pageLoading">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="Title"
                    prop="title">
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
                        <DeletePopup :item="item" action="ACT_DELETE_ROLE" />
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :action="searchKeyword ? 'ACT_SEARCH_ROLES' : 'ACT_ALL_ROLES'" :query="searchKeyword" />
        <!--Form-->
        <el-dialog
                :title="dialogTitle"
                :visible.sync="$store.state.createDialogVisible"
                width="30%">
            <el-form :model="item">
                <el-form-item label="Title" :label-width="formLabelWidth">
                    <el-input v-model="item.title"></el-input>
                </el-form-item>
                <el-form-item label="Permissions" :label-width="formLabelWidth">
                    <el-checkbox-group v-model="item.admin_permissions">
                        <el-checkbox v-for="(menu, index) in menus" :label="menu.text" v-model="menu.value" name="type" style="width: 30%"></el-checkbox>
                    </el-checkbox-group>
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
            titleTemplate: 'Role | Dashboard | Faton',
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
                    admin_permissions: []
                },
                formLabelWidth: '90px',
                dialogTitle: ''
            }
        },
        created() {
            this.$store.dispatch('ACT_ALL_ROLES', {
                current_page: 1,
                next_page: 1
            });

            this.$store.dispatch('ACT_DEPENDENCY_ROLE');
        },
        methods: {
            deletePopup(row) {
                this.item = row;
                this.$store.state.deleteDialog = true;
            },
            createItem() {
                this.dialogTitle = 'Create Role';
                // this.item = {};
                // this.item.admin_permissions = [];
                this.$store.state.createDialogVisible = true;
            },
            editItem(row) {
                this.dialogTitle = 'Edit Role';
                let menus = [];
                this.menus.forEach(menu => {
                    row.admin_permission.forEach(item_menu => {
                        if(menu.value == item_menu.admin_menu_id) {
                            menus.push(menu.text);
                        }
                    })
                });
                delete this.item.admin_permission;
                this.item.admin_permissions = menus;
                this.item.title = row.title;
                this.item.id = row.id;
                this.$store.state.createDialogVisible = true;
            },
            submit(){
                let menus = [];
                this.menus.forEach(menu => {
                    this.item.admin_permissions.forEach(item_menu => {
                        if(menu.text == item_menu) {
                            menus.push(menu.value);
                        }
                    })
                });
                this.item.admin_permissions = menus;
                let action;
                if(this.dialogTitle == 'Create Role') {
                    action = 'ACT_STORE_ROLE';
                } else {
                    action = 'ACT_UPDATE_ROLE';
                }
                this.$store.dispatch(action, this.item);
            }
        },
        computed: {
            ...mapGetters({
                roles : 'GET_ALL_ROLE_DATA',
                menus: 'GET_ROLE_DEPENDENCY',
            })
        },
        watch: {
            searchKeyword: function(val) {
                this.$store.dispatch('ACT_SEARCH_ROLES', {
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