<template>
    <v-layout>
        <v-flex xs12>
            <v-card class="pb-5">
                <v-card-actions>
                    <v-card-title>Create Sentence</v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-2" @click="addInLanguage" tile outlined small color="success">
                        <v-icon left small>add</v-icon> In Another Language
                    </v-btn>
                    <v-btn class="ma-2" :to="{name: 'sentences'}" tile outlined color="primary">
                        <v-icon left small>mdi-format-list-bulleted</v-icon> Sentence List
                    </v-btn>
                </v-card-actions>
                <v-divider></v-divider>
                <v-form class="pl-4 pr-4" v-model="valid" id="formID" ref="form" lazy-validation>
                    <v-row>
                        <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                            <v-row xs12>
                                <v-col cols="6" lg="6" md="6" sm="12">
                                    <v-text-field
                                            v-model="sentence.name"
                                            label="Name"
                                            :rules="[v => !!v || 'Name field is required']"
                                            required
                                            solo
                                            @keyup="setSlug(sentence.name)"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" lg="6" md="6" sm="12">
                                    <v-text-field
                                            v-model="sentence.slug"
                                            label="Slug"
                                            :rules="[v => !!v || 'Slug field is required']"
                                            required
                                            solo
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" lg="6" md="6" sm="12">
                                    <v-select
                                            solo
                                            :items="chapters"
                                            item-text="text"
                                            item-value="value"
                                            label="Chapter"
                                            v-model="sentence.chapter_id"
                                            no-data-text="Chapters not found"
                                            :rules="[v => !!v || 'Chapter field is required']"
                                    ></v-select>
                                </v-col>
                                <v-col cols="6" lg="6" md="6" sm="12">
                                    <v-textarea
                                            solo
                                            v-model="sentence.description"
                                            label="Sentence Description"
                                            :rules="[v => !!v || 'Description field is required']"
                                            required
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
                                            v-model="sentence.language_id[index]"
                                            no-data-text="Languages not found"
                                            solo
                                            :rules="[v => !!v || 'Language field is required']"
                                    ></v-select>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                            solo
                                            v-model="sentence.value_1[index]"
                                            label="Name"
                                            :rules="[v => !!v || 'Name field is required']"
                                            required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-textarea
                                            solo
                                            v-model="sentence.value_2[index]"
                                            label="Chapter Description"
                                            :rules="[v => !!v || 'Sentence Description field is required']"
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
            titleTemplate: 'Sentence Create | Dashboard | Faton',
        },
        data() {
            return {
                color: color,
                sentence: {
                    language_id: [],
                    value_1: [],
                    value_2: [],
                    slug: ''
                },
                valid: false,
                files: [],
                snackbar: true,
                inLang: []
            }
        },
        methods: {
            submit() {
                if(this.$refs.form.validate()) {
                    this.$store.state.submitLoading = true;
                    this.$store.dispatch('ACT_STORE_SENTENCE', this.sentence);
                }
            },
            addInLanguage() {
                this.inLang.push(['new_lang']);
            },
            setSlug(name) {
                this.sentence.slug = name.toLowerCase().replace(" ", "-");
            }
        },
        created() {
            this.$store.dispatch('ACT_DEPENDENCY_SENTENCE');
        },
        computed: {
            ...mapGetters({
                chapters : 'GET_SENTENCE_DEPENDENCY',
                languages : 'GET_SENTENCE_LANGUAGE_DEPENDENCY',
            })
        },
    }
</script>

<style scoped>

</style>