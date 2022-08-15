<!--  -->
<template>
    <div class="meedu-main-body">
        <FanHui :msg="'编辑管理员角色'"></FanHui>
        <el-form ref="form" :model="form" :rules="rules" label-width="200px">
            <el-form-item label="角色名" prop="display_name">
                <el-input v-model="form.display_name"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="权限">
                <el-cascader filterable v-model="selectedPermissions" :options="permissionsTransform" :props="{ multiple: true }" clearable></el-cascader>
            </el-form-item>
        </el-form>
        <el-row>
            <div class="bottom-menus">
                <div class="bottom-menus-box">
                    <div>
                        <el-button type="primary" @click.stop="handleClickChange">保存</el-button>
                    </div>
                    <div class="ml-24">
                        <el-button @click.stop="resetForm">取消</el-button>
                    </div>
                </div>
            </div>
        </el-row>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import FanHui from "@/components/FanHui.vue";

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        FanHui,
    },
    data() {
        //这里存放数据
        return {
            form: {
                // permission_ids: [],
            },
            permissions: {},
            rules: {
                display_name: [
                    {
                        required: true,
                        message: "角色名不能为空",
                        trigger: "blur",
                    },
                ],
                description: [
                    {
                        required: true,
                        message: "描述不能为空",
                        trigger: "blur",
                    },
                ],
                permissions: [
                    {
                        required: false,
                        message: "",
                        trigger: "blur",
                    },
                ],
            },
            selectedPermissions: [],
            permissionsTransform: [],
        };
    },
    //监听属性 类似于data概念
    computed: {
        selectedPermissionIds() {
            let selectedIds = [];
            this.selectedPermissions.forEach((item) => {
                selectedIds.push(item[1]);
            });
            // console.log(selectedIds);
            return selectedIds;
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        resetForm() {
            this.$router.push({
                path: "/system/adminroles",
            });
        },
        handleClickBack() {
            this.$router.go(-1);
        },
        async handleClickChange() {
            let data = {};
            Object.assign(data, this.form, {
                permission_ids: this.selectedPermissionIds,
            });
            await this.$request
                .put(`administrator_role/${this.$route.query.id}`, data)
                .then(() => {
                    this.$refs["form"].validate((valid) => {
                        if (valid) {
                            this.$message.success("编辑成功");
                            this.$router.push({
                                path: "/system/adminroles",
                            });
                        } else {
                            this.$message.error("添加失败");
                            return;
                        }
                    });
                })
                .catch((e) => {
                    this.$message.error("添加失败");
                });
        },
        params() {
            this.$request.get(`administrator_role/create`).then((con) => {
                this.permissions = con.data.permissions;
                let p = [];
                for (let i in this.permissions) {
                    let children = [];
                    for (let j = 0; j < this.permissions[i].length; j++) {
                        children.push({
                            value: this.permissions[i][j].id,
                            label: this.permissions[i][j].display_name,
                        });
                    }
                    p.push({
                        value: i,
                        label: i,
                        children: children,
                    });
                }
                this.permissionsTransform = p;
                this.getDetail();
            });
        },
        getDetail() {
            this.$request.get(`administrator_role/${this.$route.query.id}`).then((res) => {
                this.form = res.data;
                let selectedPermissions = [];
                res.data.permission_ids.forEach((item) => {
                    for (let i = 0; i < this.permissionsTransform.length; i++) {
                        for (let j = 0; j < this.permissionsTransform[i].children.length; j++) {
                            if (item === this.permissionsTransform[i].children[j].value) {
                                selectedPermissions.push([this.permissionsTransform[i].value, item]);
                                return;
                            }
                        }
                    }
                });
                this.selectedPermissions = selectedPermissions;
            });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.params();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.meedu-main-body {
    width: 100%;
    height: auto;
    float: left;
    background-color: #fff;
    box-sizing: border-box;
    padding: 30px;
    border-radius: 15px;
    margin-bottom: 90px;
    box-shadow: 0 2px 4px 0 hsl(0deg 0% 40% / 5%);
    min-width: 1180px;
    .back-bar-box.mb-30 {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        .btn-back {
            font-size: 14px;
            font-weight: 400;
            color: #333;
            cursor: pointer;
            i.el-icon-back {
                font-family: element-icons !important;
                // speak: none;
                font-style: normal;
                font-weight: 400;
                font-variant: normal;
                text-transform: none;
                line-height: 1;
                vertical-align: baseline;
                display: inline-block;
                -webkit-font-smoothing: antialiased;
            }
            .el-icon-back:before {
                content: "\e6ea";
            }
        }

        .line {
            width: 1px;
            height: 14px;
            background-color: #d8d8d8;
            margin-right: 15px;
            margin-left: 15px;
        }

        .name {
            font-size: 14px;
            font-weight: 600;
            color: #333;
        }
    }
    /deep/input {
        width: 300px;
    }
    /deep/.el-cascader .el-input .el-input__inner {
        width: 1000px;
    }
    /deep/.el-link.el-link--primary.is-underline {
        margin-left: 15px;
    }
    /deep/.el-switch {
        margin-left: 130px;
    }
    .bottom-menus {
        width: 100%;
        height: 1px;
        // float: left;
        .bottom-menus-box {
            position: fixed;
            bottom: 0;
            left: 200px;
            right: 0;
            z-index: 2000;
            box-sizing: border-box;
            padding-top: 20px;
            padding-bottom: 20px;
            padding-left: 20px;
            background-color: #fff;
            display: flex;
            box-shadow: 0 -2px 4px 0 hsl(0deg 0% 40% / 5%);
            button.el-button.el-button--primary {
                color: #fff;
                background-color: #409eff;
                border-color: #409eff;
                span {
                    font-weight: 400;
                }
            }

            .ml-24 {
                margin-left: 24px;
                button.el-button.el-button--default {
                    font-weight: 400;
                    display: inline-block;
                    line-height: 1;
                    white-space: nowrap;
                    cursor: pointer;
                    background: #fff;
                    border: 1px solid #dcdfe6;
                    color: #606266;
                    -webkit-appearance: none;
                    text-align: center;
                    box-sizing: border-box;
                    outline: 0;
                    margin: 0;
                    transition: 0.1s;
                    font-weight: 500;
                    padding: 12px 20px;
                    font-size: 14px;
                    border-radius: 4px;
                    span {
                        font-weight: 400;
                    }
                }
            }
        }
    }
}
</style>
