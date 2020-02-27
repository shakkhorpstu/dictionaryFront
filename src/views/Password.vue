<template>
    <v-layout>
        <v-flex xs12>
            <v-card class="pb-5">
                <v-card-actions>
                    <v-card-title>Create Blog Post</v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-2" :to="{name: 'blogs'}" tile outlined color="primary">
                        <v-icon left small>mdi-format-list-bulleted</v-icon> Blog Post List
                    </v-btn>
                </v-card-actions>
                <v-divider></v-divider>
                <v-form class="pl-4 pr-4" v-model="valid" id="formID" ref="form" lazy-validation>
                    <v-row>
                        <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                            <v-row xs12>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="password.old_password"
                                            label="Old Password"
                                            :rules="[v => !!v || 'Field is required']"
                                            required
                                            solo
                                            type="password"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="password.password"
                                            label="New Password"
                                            :rules="[v => !!v || 'Field is required']"
                                            required
                                            solo
                                            type="password"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="password.password_confirmation"
                                            label="Confirm Password"
                                            :rules="[v => !!v || 'Field is required']"
                                            required
                                            solo
                                            type="password"
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
    import color from "../plugins/colors";

    export default {
        name: "Password",
        metaInfo: {
            titleTemplate: 'Change Password | Dashboard | Faton',
        },
        data() {
            return {
                color: color,
                password: {},
                valid: false,
            }
        },
        methods: {
            submit() {
                if(this.$refs.form.validate()) {
                    this.$store.state.submitLoading = true;
                    this.$store.dispatch('ACT_CHANGE_PASSWORD', this.password);
                }
            },
        }
    }
</script>

<style scoped>

</style>