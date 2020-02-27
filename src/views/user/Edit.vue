<template>
    <v-layout>
        <v-flex xs12>
            <v-card class="pb-5">
                <v-card-actions>
                    <v-card-title>Edit User</v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-2" :to="{name: 'users'}" tile outlined color="primary">
                        <v-icon left small>mdi-format-list-bulleted</v-icon> User List
                    </v-btn>
                </v-card-actions>
                <v-divider></v-divider>
                <v-form class="pl-4 pr-4" v-model="valid" id="formID" ref="form" lazy-validation>
                    <v-row>
                        <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                            <v-row xs12>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="user.first_name"
                                            label="First Name"
                                            :rules="[v => !!v || 'First Name field is required']"
                                            required
                                            solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="user.last_name"
                                            label="Last Name"
                                            :rules="[v => !!v || 'Last Name field is required']"
                                            required
                                            solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="user.email"
                                            label="Email"
                                            :rules="[v => !!v || 'Email field is required']"
                                            required
                                            solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="user.phone_no"
                                            label="Phone Number"
                                            :rules="[v => !!v || 'Phone number field is required']"
                                            required
                                            solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-select
                                            solo
                                            :items="countries"
                                            item-text="text"
                                            item-value="value"
                                            label="Country"
                                            v-model="user.country_id"
                                            no-data-text="Countries not found"
                                    ></v-select>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="user.city"
                                            label="City"
                                            solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="user.zip_code"
                                            label="Zip Code"
                                            solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="user.street_address"
                                            label="Street Address"
                                            solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="user.website"
                                            label="Website"
                                            solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="user.facebook_link"
                                            label="Facebook"
                                            solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="user.github_link"
                                            label="Github"
                                            solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="user.password"
                                            label="Password"
                                            type="password"
                                            solo
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-btn  style="color: #fff; float: right;"
                                    :disabled="!valid"
                                    :loading="$store.state.submitLoading"
                                    :color="color.success"
                                    class="mb-5 ml-3"
                                    x-large
                                    @click="submit"
                            >
                                Submit
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-flex>
        <v-snackbar v-model="$store.state.snackbar" left>
            {{ $store.state.notificationMessage }}
        </v-snackbar>
    </v-layout>
</template>

<script>
    import color from '../../plugins/colors';
    import { mapGetters } from 'vuex';

    export default {
        name: "Edit",
        metaInfo: {
            titleTemplate: 'User Edit | Dashboard | Faton',
        },
        data() {
            return {
                color: color,
                valid: false,
            }
        },
        methods: {
            submit() {
                if(this.$refs.form.validate()) {
                    this.$store.state.submitLoading = true;
                    this.$store.dispatch('ACT_UPDATE_USER', this.user);
                }
            }
        },
        created() {
            this.$store.dispatch('ACT_DEPENDENCY_USER');
            this.$store.dispatch('ACT_SINGLE_USER', this.$route.params.id);
        },
        computed: {
            ...mapGetters({
                countries : 'GET_USER_COUNTRY_DEPENDENCY',
                user: 'GET_SINGLE_USER'
            })
        },
    }
</script>

<style scoped>

</style>