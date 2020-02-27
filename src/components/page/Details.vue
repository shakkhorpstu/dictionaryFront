<template>
    <el-dialog
            title="Chapter Details"
            :visible.sync="$store.state.detailsDialogVisible"
            width="60%">
        <el-row :gutter="20">
            <el-col :span="8">
                <h3>Title</h3>
                <p>{{ item.title }}</p>
            </el-col>
            <el-col :span="16">
                <h3>Description</h3>
                <p v-html="item.body"></p>
            </el-col>
        </el-row>

        <div v-for="(translation, index) in item.translations">
            <hr>
            <h3 class="pt-2 pb-1">{{ translation.language.name }} ({{ translation.language.code }})</h3>
            <el-row :gutter="20">
                <el-col :span="6">
                    <p>{{ translation.value_1 }}</p>
                </el-col>
                <el-col :span="18">
                    <p>{{ translation.value_2 }}</p>
                </el-col>
            </el-row>
        </div>

        <el-row :gutter="20">
            <el-col :span="8">
                <h3>Page Image</h3>
                <v-img :src="item.featured_image" aspect-ratio="2"></v-img>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
    export default {
        name: "Details",
        props: ['item']
    }
</script>

<style scoped>

</style>