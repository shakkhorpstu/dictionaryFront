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
                                            v-model="blog.title"
                                            label="Name"
                                            :rules="[v => !!v || 'Title field is required']"
                                            required
                                            @keyup="setSlug(blog.title)"
                                            solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="blog.slug"
                                            label="Slug"
                                            :rules="[v => !!v || 'Slug field is required']"
                                            required
                                            solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-file-input
                                            solo
                                            @change="onChangeFileSet($event)"
                                            placeholder="Select your image"
                                    ></v-file-input>
                                </v-col>
                                <v-col cols="12" lg="12" md="12" sm="12">
<!--                                    <v-textarea-->
<!--                                            solo-->
<!--                                            v-model="blog.body"-->
<!--                                            label="Blog Description"-->
<!--                                            :rules="[v => !!v || 'Description field is required']"-->
<!--                                            required-->
<!--                                    ></v-textarea>-->
                                    <yimo-vue-editor v-model="blog.body"></yimo-vue-editor>
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
    import color from "../../plugins/colors";
    import {mapGetters} from "vuex";
    import YimoVueEditor from 'yimo-vue-editor'

    export default {
        name: "Create",
        metaInfo: {
            titleTemplate: 'Blog Create | Dashboard | Faton',
        },
        components: {
            YimoVueEditor
        },
        data() {
            return {
                color: color,
                blog: {
                    slug: '',
                },
                valid: false,
                files: '',
                snackbar: true,
                inLang: [],
            }
        },
        methods: {
            onChangeFileSet(file) {
                this.files = file;
            },
            submit() {
                if(this.$refs.form.validate()) {
                    let formData = new FormData();
                    formData.append('image', this.files);
                    Object.keys(this.blog).map(data =>{
                        formData.append(data, this.blog[data]);
                    });
                    this.$store.state.submitLoading = true;
                    this.$store.dispatch('ACT_STORE_BLOG', formData);
                }
            },
            setSlug(name) {
                this.blog.slug = name.toLowerCase().replace(" ", "-");
            }
        }
    }
</script>

<style scoped>

</style>