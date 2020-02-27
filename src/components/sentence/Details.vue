<template>
    <el-dialog
            title="Sentence Details"
            :visible.sync="$store.state.detailsDialogVisible"
            width="60%">
        <el-row :gutter="20">
            <el-col :span="6">
                <h3>Name</h3>
                <p>{{ item.name }}</p>
            </el-col>
            <el-col :span="6">
                <h3>Chapter</h3>
                <p>{{ item.chapter ? item.chapter.name : 'N/A' }}</p>
            </el-col>
            <el-col :span="12">
                <h3>Description</h3>
                <p>{{ item.description }}</p>
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