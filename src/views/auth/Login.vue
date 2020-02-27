<template>
    <v-app>
        <v-content>
            <v-container
                    class="fill-height"
                    fluid
            >
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="8"
                            md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                    color="primary"
                                    dark
                                    flat
                            >
                                <v-toolbar-title><v-icon>verified_user</v-icon> Admin Login </v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            label="Login"
                                            name="login"
                                            prepend-icon="email"
                                            v-model="user.email"
                                            type="text"
                                    />

                                    <v-text-field
                                            id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="lock"
                                            v-model="user.password"
                                            type="password"
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="primary" :loading="$store.state.submitLoading" @click="login"><v-icon>near_me</v-icon> Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
        <v-snackbar v-model="$store.state.snackbar" left>
            {{ $store.state.notificationMessage }}
        </v-snackbar>
    </v-app>
</template>

<script>
    import color from "../../plugins/colors";
    import {mapGetters} from "vuex";

    export default {
        name: "Login",
        metaInfo: {
            titleTemplate: 'Login | Faton',
        },
        data: () => ({
            color: color,
            user: {}
        }),
        methods: {
            login() {
                this.$store.commit('MUT_START_LOADING');
                this.$store.dispatch('ACT_LOGIN', this.user);
            }
        }
    }
</script>

<style>

</style>