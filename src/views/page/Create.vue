<template>
    <v-layout>
        <v-flex xs12>
            <v-card class="pb-5">
                <v-card-actions>
                    <v-card-title>Create Page</v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-2" @click="addInLanguage" tile outlined small color="success">
                        <v-icon left small>add</v-icon> In Another Language
                    </v-btn>
                    <v-btn class="ma-2" :to="{name: 'pages'}" tile outlined color="primary">
                        <v-icon left small>mdi-format-list-bulleted</v-icon> Page List
                    </v-btn>
                </v-card-actions>
                <v-divider></v-divider>
                <v-form class="pl-4 pr-4" v-model="valid" id="formID" ref="form" lazy-validation>
                    <v-row>
                        <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                            <v-row xs12>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="page.title"
                                            label="Title"
                                            :rules="[v => !!v || 'Title field is required']"
                                            required
                                            @keyup="setSlug(page.title)"
                                            solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="page.slug"
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
<!--                                            v-model="page.body"-->
<!--                                            label="Page Description"-->
<!--                                            :rules="[v => !!v || 'Description field is required']"-->
<!--                                            required-->
<!--                                    ></v-textarea>-->
                                    <yimo-vue-editor v-model="page.body"></yimo-vue-editor>
                                </v-col>
                            </v-row>
                            <v-row v-for="(loop, index) in inLang">
                                <v-col cols="2">
                                    <v-select
                                            :items="languages"
                                            item-text="text"
                                            item-value="value"
                                            label="Language"
                                            v-model="page.language_id[index]"
                                            no-data-text="Languages not found"
                                            solo
                                            :rules="[v => !!v || 'Language field is required']"
                                    ></v-select>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                            solo
                                            v-model="page.value_1[index]"
                                            label="Title"
                                            :rules="[v => !!v || 'Title field is required']"
                                            required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
<!--                                    <v-textarea-->
<!--                                            solo-->
<!--                                            v-model="page.value_2[index]"-->
<!--                                            label="Page Description"-->
<!--                                            :rules="[v => !!v || 'Page Description field is required']"-->
<!--                                            required-->
<!--                                    ></v-textarea>-->
                                    <yimo-vue-editor v-model="page.value_2[index]"></yimo-vue-editor>
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
            titleTemplate: 'Page Create | Dashboard | Faton',
        },
        components: {
            YimoVueEditor
        },
        data() {
            return {
                color: color,
                page: {
                    slug: '',
                    language_id: [],
                    value_1: [],
                    value_2: []
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
                    Object.keys(this.page).map(data =>{
                        formData.append(data, this.page[data]);
                    });
                    formData.append('language_id', JSON.stringify(this.page.language_id));
                    formData.append('value_1', JSON.stringify(this.page.value_1));
                    formData.append('value_2', JSON.stringify(this.page.value_2));
                    this.$store.state.submitLoading = true;
                    this.$store.dispatch('ACT_STORE_PAGE', formData);
                }
            },
            setSlug(name) {
                this.page.slug = name.toLowerCase().replace(" ", "-");
            },
            addInLanguage() {
                this.inLang.push(['new_lang']);
            },
        },
        created() {
          this.$store.dispatch('ACT_DEPENDENCY_PAGE');
        },
        computed: {
            ...mapGetters({
                languages : 'GET_PAGE_LANGUAGE_DEPENDENCY',
            })
        },
    }
</script>

<style scoped>

</style>