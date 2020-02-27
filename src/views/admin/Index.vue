<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>Admin List</span>
            <v-btn style="float: right;" small rounded tile outlined :color="color.addButton" @click="createItem">
                <v-icon left>mdi-plus-circle-outline</v-icon> Create
            </v-btn>
        </div>
        <el-table :data="admins" style="width: 100%" v-loading="$store.state.pageLoading">
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
                        label="Role"
                        prop="admin.admin_role.title">
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
                        <DeletePopup :item="user" action="ACT_DELETE_ADMIN" />
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :action="searchKeyword ? 'ACT_SEARCH_ADMINS' : 'ACT_ALL_ADMINS'" :query="searchKeyword" />
        <!--Form-->
        <el-dialog
                :title="dialogTitle"
                :visible.sync="$store.state.createDialogVisible"
                width="30%">
            <el-form :model="user" label-width="80px">
                <el-form-item label="Name">
                    <el-input v-model="user.first_name"></el-input>
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model="user.email"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="user.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="Role">
<!--                    <el-select v-model="user.admin_role_id" placeholder="Please select a Role" style="width: 100%;">-->
<!--                        <el-option v-for="(role, index) in roles" :label="role.text" :value="role.value"></el-option>-->
<!--                    </el-select>-->
                    <v-select
                            solo
                            dense
                            :items="roles"
                            item-text="text"
                            item-value="value"
                            placeholder="Select Role"
                            v-model="user.admin_role_id"
                            no-data-text="Roles not found"
                    ></v-select>
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
            titleTemplate: 'Admin | Dashboard | Faton',
        },
        components: {
            Pagination,
            DeletePopup,
        },
        data() {
            return {
                color: color,
                searchKeyword: '',
                user: {},
                formLabelWidth: '80px',
                dialogTitle: ''
            }
        },
        created() {
            this.$store.dispatch('ACT_ALL_ADMINS', {
                current_page: 1,
                next_page: 1
            });

            this.$store.dispatch('ACT_DEPENDENCY_ADMIN');
        },
        methods: {
            deletePopup(row) {
                this.user = row;
                this.$store.state.deleteDialog = true;
            },
            createItem() {
                this.user = {};
                this.dialogTitle = 'Create Admin';
                this.$store.state.createDialogVisible = true;
            },
            editItem(row) {
                this.dialogTitle = 'Edit Admin';
                let admin_role_id = row.admin.admin_role.id;
                delete row.admin;
                this.user = row;
                this.user.admin_role_id = admin_role_id;
                this.$store.state.createDialogVisible = true;
            },
            submit(){
                let action;
                if(this.dialogTitle == 'Create Admin') {
                    action = 'ACT_STORE_ADMIN';
                } else {
                    action = 'ACT_UPDATE_ADMIN';
                }
                this.$store.dispatch(action, this.user);
            }
        },
        computed: {
            ...mapGetters({
                admins : 'GET_ALL_ADMIN_DATA',
                roles: 'GET_ADMIN_ROLE_DEPENDENCY',
            })
        },
        watch: {
            searchKeyword: function(val) {
                this.$store.dispatch('ACT_SEARCH_ADMINS', {
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