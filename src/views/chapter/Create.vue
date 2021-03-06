<template>
    <v-layout>
        <v-flex xs12>
            <v-card class="pb-5">
                <v-card-actions>
                    <v-card-title>Create Chapter</v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-2" @click="addInLanguage" tile outlined small color="success">
                        <v-icon left small>add</v-icon> In Another Language
                    </v-btn>
                    <v-btn class="ma-2" :to="{name: 'chapters'}" tile outlined color="primary">
                        <v-icon left small>mdi-format-list-bulleted</v-icon> Chapter List
                    </v-btn>
                </v-card-actions>
                <v-divider></v-divider>
                <v-form class="pl-4 pr-4" v-model="valid" id="formID" ref="form" lazy-validation>
                    <v-row>
                        <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                            <v-row xs12>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="chapter.name"
                                            label="Name"
                                            :rules="[v => !!v || 'Name field is required']"
                                            required
                                            @keyup="setSlug(chapter.name)"
                                            solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-text-field
                                            v-model="chapter.slug"
                                            label="Slug"
                                            :rules="[v => !!v || 'Slug field is required']"
                                            required
                                            solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="4" lg="4" md="6" sm="12">
                                    <v-select
                                            solo
                                            :items="chapters"
                                            item-text="text"
                                            item-value="value"
                                            label="Parent Chapter"
                                            v-model="chapter.parent_chapter_id"
                                            no-data-text="Chapters not found"
                                    ></v-select>
                                </v-col>
                                <v-col cols="6" lg="6" md="6" sm="12">
                                    <v-text-field
                                            solo
                                            v-model="chapter.keywords"
                                            label="Keywords"
                                            :rules="[v => !!v || 'Keywords field is required']"
                                            required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" lg="6" md="6" sm="12">
                                    <v-file-input
                                            solo
                                            @change="onChangeFileSet($event)"
                                            placeholder="Select your image"
                                    ></v-file-input>
                                </v-col>
                                <v-col cols="6" lg="6" md="6" sm="12">
                                    <v-textarea
                                            solo
                                            v-model="chapter.description"
                                            label="Chapter Description"
                                            :rules="[v => !!v || 'Chapter Description field is required']"
                                            required
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="6" lg="6" md="6" sm="12">
                                    <v-textarea
                                            solo
                                            v-model="chapter.meta_description"
                                            label="Chapter Meta Description"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row v-for="(loop, index) in inLang">
                                <v-col cols="2">
                                    <v-select
                                            :items="languages"
                                            item-text="text"
                                            item-value="value"
                                            label="Language"
                                            v-model="chapter.language_id[index]"
                                            no-data-text="Languages not found"
                                            solo
                                            :rules="[v => !!v || 'Language field is required']"
                                    ></v-select>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                            solo
                                            v-model="chapter.value_1[index]"
                                            label="Name"
                                            :rules="[v => !!v || 'Name field is required']"
                                            required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-textarea
                                            solo
                                            v-model="chapter.value_2[index]"
                                            label="Chapter Description"
                                            :rules="[v => !!v || 'Chapter Description field is required']"
                                            required
                                    ></v-textarea>
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
        name: "Create",
        metaInfo: {
            titleTemplate: 'Chapter Create | Dashboard | Faton',
        },
        data() {
            return {
                color: color,
                chapter: {
                    image: '',
                    slug: '',
                    language_id: [],
                    value_1: [],
                    value_2: []
                },
                valid: false,
                files: '',
                snackbar: true,
                inLang: [],
                imageUrl: ''
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
                    Object.keys(this.chapter).map(data =>{
                        formData.append(data, this.chapter[data]);
                    });
                    formData.append('language_id', JSON.stringify(this.chapter.language_id));
                    formData.append('value_1', JSON.stringify(this.chapter.value_1));
                    formData.append('value_2', JSON.stringify(this.chapter.value_2));
                    this.$store.state.submitLoading = true;
                    this.$store.dispatch('ACT_STORE_CHAPTER', formData);
                }
            },
            addInLanguage() {
                this.inLang.push(['new_lang']);
            },
            setSlug(name) {
                this.chapter.slug = name.toLowerCase().replace(" ", "-");
            }
        },
        created() {
            this.$store.dispatch('ACT_DEPENDENCY_CHAPTER');
        },
        computed: {
            ...mapGetters({
                chapters : 'GET_CHAPTER_DEPENDENCY',
                languages : 'GET_CHAPTER_LANGUAGE_DEPENDENCY',
            })
        },
    }
</script>

<style>

</style>