<template>
    <v-layout>
        <v-flex xs12>
            <v-card class="pb-5">
                <v-card-actions>
                    <v-card-title>Edit Page</v-card-title>
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
                                            v-model="singlePage.title"
                                            label="Title"
                                            :rules="[v => !!v || 'Title field is required']"
                                            required
                                            @keyup="setSlug(singlePage.title)"
                                            solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="singlePage.slug"
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
<!--                                            v-model="singlePage.body"-->
<!--                                            label="Page Description"-->
<!--                                            :rules="[v => !!v || 'Description field is required']"-->
<!--                                            required-->
<!--                                    ></v-textarea>-->
                                    <yimo-vue-editor v-model="singlePage.body"></yimo-vue-editor>
                                </v-col>
                            </v-row>
                            <v-row v-for="(transalation, index) in singlePage.translations">
                                <v-col cols="2">
                                    <v-select
                                            :items="languages"
                                            item-text="text"
                                            item-value="value"
                                            label="Language"
                                            v-model="singlePage.translations[index].language_id"
                                            no-data-text="Languages not found"
                                            solo
                                            :rules="[v => !!v || 'Language field is required']"
                                    ></v-select>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                            solo
                                            v-model="singlePage.translations[index].value_1"
                                            label="Title"
                                            :rules="[v => !!v || 'Title field is required']"
                                            required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
<!--                                    <v-textarea-->
<!--                                            solo-->
<!--                                            v-model="singlePage.translations[index].value_2"-->
<!--                                            label="Page Description"-->
<!--                                            :rules="[v => !!v || 'Page Description field is required']"-->
<!--                                            required-->
<!--                                    ></v-textarea>-->
                                    <yimo-vue-editor v-model="singlePage.translations[index].value_2"></yimo-vue-editor>
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
    import color from '../../plugins/colors';
    import { mapGetters } from 'vuex';
    import YimoVueEditor from 'yimo-vue-editor'

    export default {
        name: "Edit",
        metaInfo: {
            titleTemplate: 'Page Edit | Dashboard | Faton',
        },
        components: {
            YimoVueEditor
        },
        data() {
            return {
                color: color,
                page: {
                    language_id: [],
                    value_1: [],
                    value_2: []
                },
                valid: false,
                files: '',
                snackbar: true,
                inLang: [],
                hasImage: false
            }
        },
        methods: {
            onChangeFileSet(file) {
                this.files = file;
                this.hasImage = true;
            },
            submit() {
                if(this.$refs.form.validate()) {
                    let formData = new FormData();
                    formData.append('image', this.files);
                    Object.keys(this.singlePage).map(data =>{
                        formData.append(data, this.singlePage[data]);
                    });
                    this.$store.state.submitLoading = true;
                    this.singlePage.newLanguages = this.page;
                    this.$store.dispatch('ACT_UPDATE_PAGE', {
                        singlePage: this.singlePage,
                        image: formData,
                        hasImage: this.hasImage
                    });
                }
            },
            addInLanguage() {
                this.inLang.push(['new_lang']);
            },
            setSlug() {
                let name = this.singlePage.title;
                name = name.toLowerCase();
                name = name.replace(" ", "-");
                this.singlePage.slug = name.toLowerCase().replace(" ", "-");
            }
        },
        created() {
            this.$store.dispatch('ACT_DEPENDENCY_PAGE');
            this.$store.dispatch('ACT_SINGLE_PAGE', this.$route.params.id);
        },
        computed: {
            ...mapGetters({
                languages : 'GET_PAGE_LANGUAGE_DEPENDENCY',
                singlePage : 'GET_SINGLE_PAGE',
            })
        },
    }
</script>

<style scoped>

</style>