<!--  -->
<template>
    <div class="contentBox">
        <div class="meedu-main-body">
            <!-- 筛选部分 -->
            <div class="j-b-flex mb-30">
                <div class="d-flex widthLong">
                    <el-row>
                        <el-button type="primary" @click.stop="$router.push('create')">添加学员</el-button>
                        <el-button type="primary" @click.stop="$router.push('import')">批量导入</el-button>
                        <el-button type="primary" @click.stop="batchSendMessages">批量发消息</el-button>
                        <el-button type="primary" @click.stop="batchModification">批量修改</el-button>
                    </el-row>
                </div>

                <div class="d-flex widthLong">
                    <!-- 学员关键字 -->
                    <div class="studentKeywords">
                        <el-input class="w-150px" v-model="keywords" placeholder="学员关键字"></el-input>
                    </div>

                    <!-- 清空和筛选 -->
                    <div class="emptyingAndFiltering">
                        <el-button @click.stop="empty">清空</el-button>
                        <el-button @click.stop="screen" type="primary">筛选</el-button>
                    </div>

                    <!-- 更多 -->
                    <div class="more d-flex ml-10" @click.stop="drawer = true">
                        <img src="@/assets/img/icon-filter.png" alt="" />
                        <span>更多</span>
                    </div>
                </div>
            </div>

            <!-- 批量发消息  对话框 -->
            <el-dialog title="发消息" :visible.sync="dialogBatchSendMessagesVisible" width="400px">
                <div class="d-flex">
                    <el-input type="textarea" maxlength="500" resize="none" show-word-limit v-model="message" placeholder="请输入消息文本" rows="4"></el-input>
                </div>

                <div class="j-r-flex mt-20">
                    <el-button type="primary" @click.stop="sendMessageMulti" v-if="userID">确认</el-button>
                    <el-button type="primary" @click.stop="batchSendMessageMulti" v-else>确认</el-button>
                </div>
            </el-dialog>

            <!-- 批量修改  对话框 -->
            <el-dialog title="批量修改" :visible.sync="dialogBatchModificationVisible" width="420px">
                <div class="d-flex">
                    <el-select class="w-400" v-model="current" @change="clearModification">
                        <el-option v-for="(item, index) in types" :key="index" :label="item.name" :value="item.key"></el-option>
                    </el-select>
                </div>

                <!-- 修改VIP时显示 -->
                <div class="d-flex mt-20" v-if="current === 'role_id'">
                    <label class="w-100 mr-20">选择VIP</label>

                    <el-select class="el-item" :key="current" v-model="form.role_id">
                        <el-option v-for="(item, index) in filterData.roles" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </div>

                <!-- 修改VIP时显示 -->
                <div class="d-flex mt-20" v-if="current === 'role_id'">
                    <label class="w-100 mr-20">VIP过期时间</label>

                    <el-date-picker
                        class="el-item"
                        v-model="form.role_expired_at"
                        type="datetime"
                        placeholder="选择日期"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="newPickerOptions"
                    ></el-date-picker>
                </div>

                <!-- 修改标签时显示 -->
                <div class="d-flex mt-20" v-if="current === 'tag'">
                    <label class="w-100 mr-20">选择标签</label>

                    <el-select class="el-item" :key="current" v-model="form.tag_ids">
                        <el-option v-for="(item, index) in filterData.tags" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </div>

                <!-- 修改是否禁止登录时显示 -->
                <div class="d-flex mt-20" v-if="current === 'is_lock'">
                    <label class="w-100 mr-20">是否禁止登录</label>

                    <el-switch :key="current" v-model="form.is_lock" :active-value="1" :inactive-value="0"></el-switch>
                </div>

                <!-- 确认提交按钮 -->
                <div class="j-r-flex mt-30">
                    <el-button type="primary" @click="submitModification">确认</el-button>
                </div>
            </el-dialog>

            <!-- Drawer抽屉 -->
            <el-drawer :size="360" :visible.sync="drawer" :with-header="false">
                <div class="n-padding-box">
                    <div class="title">更多筛选</div>

                    <div class="j-flex">
                        <el-input class="w-300" v-model="keywords" placeholder="学员列表关键字"></el-input>
                    </div>

                    <div class="j-flex mt-20">
                        <el-select v-model="role_id" class="w-300" placeholder="VIP会员" filterable>
                            <el-option v-for="(item, index) in filterData.roles" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </div>

                    <div class="j-flex mt-20">
                        <el-select v-model="tag_id" class="w-300" placeholder="学员标签" filterable>
                            <el-option v-for="(item, index) in filterData.tags" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </div>

                    <div class="j-flex mt-20">
                        <el-date-picker
                            v-model="created_at"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="注册开始日期"
                            end-placeholder="注册结束日期"
                            :picker-options="pickerOptions"
                        ></el-date-picker>
                    </div>

                    <div class="j-b-flex mt-30">
                        <el-button @click.stop="empty">清空</el-button>
                        <el-button @click.stop="screen" type="primary">筛选</el-button>
                    </div>
                </div>
            </el-drawer>

            <div class="mb-30 check-num">已选择{{ ids.length }}项</div>

            <!-- 表格部分 -->
            <div v-loading="loading">
                <div>
                    <div class="el-table el-table--fit el-table--scrollable-x el-table--enable-row-transition">
                        <!-- 表格 -->
                        <el-table
                            ref="multipleTable"
                            :data="users"
                            tooltip-effect="dark"
                            style="width: 100%; fontsize: 17px; color: #303133"
                            @selection-change="handleSelectionChange"
                            @sort-change="sortChange"
                            class="tableHeader"
                            :default-sort="{ prop: 'id', order: 'descending' }"
                            :header-cell-style="{ background: '#f1f2f9' }"
                        >
                            <!-- 复选框 -->
                            <el-table-column type="selection" width="55"></el-table-column>

                            <!-- 学员ID -->
                            <el-table-column prop="id" label="学员ID" sortable width="100"></el-table-column>

                            <!-- 学员 -->
                            <el-table-column label="学员" width="240">
                                <template slot-scope="scope" class="studentPart">
                                    <div class="studentAvatarPhoto">
                                        <img :src="scope.row.avatar" class="studentAvatar" />
                                    </div>
                                    <div class="studentAvatarName">
                                        <span>{{ scope.row.nick_name }}</span>
                                    </div>
                                </template>
                            </el-table-column>

                            <!-- 注册时间 -->
                            <el-table-column label="注册时间" sortable="" width="220">
                                <template slot-scope="scope">{{ scope.row.created_at | dateFormat }}</template>
                            </el-table-column>

                            <!-- 手机号 -->
                            <el-table-column prop="mobile" label="手机号" width="170"> </el-table-column>

                            <!-- VIP会员 -->
                            <el-table-column label="VIP会员" width="140">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.role">{{ scope.row.role.name }}</span>
                                    <span v-else></span>
                                </template>
                            </el-table-column>

                            <!-- 积分 -->
                            <el-table-column prop="credit1" label="积分" sortable width="140"> </el-table-column>

                            <!-- 标签 -->
                            <el-table-column label="标签" width="220">
                                <template slot-scope="scope">
                                    <el-tag v-for="(item, index) in scope.row.tags" :key="index" class="ml-5">
                                        {{ item.name }}
                                    </el-tag>
                                </template>
                            </el-table-column>

                            <!-- 备注 -->
                            <el-table-column label="备注" width="100">
                                <template slot-scope="scope">
                                    <div v-if="userRemark[scope.row.id]" v-html="userRemark[scope.row.id].remark"></div>
                                </template>
                            </el-table-column>

                            <!-- 操作 -->
                            <el-table-column fixed="right" label="操作" width="130">
                                <template slot-scope="scope">
                                    <el-button @click.stop="handleClick(scope.row)" type="text" size="small" class="underline">查看</el-button>
                                    <el-button type="text" size="small" class="underline">
                                        <el-dropdown>
                                            <span class="el-dropdown-link"> 更多<i class="el-icon-arrow-down el-icon--right"></i> </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item>
                                                    <span @click.stop="sendMessage(scope.row)">发消息</span>
                                                </el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <!-- 分页 -->
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                            class="paging"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            type: "person",
            loading: false,

            // 批量发消息  对话框
            dialogBatchSendMessagesVisible: false,

            // 批量修改  对话框
            dialogBatchModificationVisible: false,

            // Drawer抽屉
            drawer: false,

            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            newPickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                },
            },

            page: 1, // 当前页码
            size: 10, // 每页的数据条数
            sort: "id",
            order: "desc",
            keywords: null,
            role_id: null,
            tag_id: null,
            created_at: null,

            ids: [],
            users: [],
            userRemark: [],
            total: 0,
            filterData: {
                tags: [],
                roles: [],
            },
            userID: null,
            message: null,

            form: {
                role_expired_at: null,
                tag_ids: [],
                role_id: null,
                is_lock: null,
            },

            current: null,
            types: [
                {
                    name: "修改VIP",
                    key: "role_id",
                },
                {
                    name: "修改标签",
                    key: "tag",
                },
                {
                    name: "是否禁止登录",
                    key: "is_lock",
                },
            ],

            dialogLoading: false,
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        // 已选择的复选框
        handleSelectionChange(val) {
            var newBox = [];
            for (var i = 0; i < val.length; i++) {
                newBox.push(val[i].id);
            }
            this.ids = newBox;
        },

        //获取当前行
        handleClick(row) {
            console.log(row);
        },

        //每页条数改变时触发 选择一页显示多少行
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.page = 1;
            this.size = val;
            this.getUser();
        },

        //当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val;
            this.sort = this.sort;
            this.order = this.order;
            this.keywords = this.keywords;
            this.role_id = this.role_id;
            this.tag_id = this.tag_id;
            this.created_at = this.created_at;
            this.getUser(this.page, this.sort, this.order, this.keywords, this.role_id, this.tag_id, this.created_at);
        },

        // 分类改变
        sortChange(column) {
            this.sort = column.prop;
            this.order = column.order === "ascending" ? "asc" : "desc";
            this.page = this.page;
            this.keywords = this.keywords;
            this.role_id = this.role_id;
            this.tag_id = this.tag_id;
            this.created_at = this.created_at;
            this.getUser(this.page, this.sort, this.order, this.keywords, this.role_id, this.tag_id, this.created_at);
        },

        // 获取所有用户数据
        getUser(newPage, newSort, newOrder, newKeywords, newRoleId, newTagId, newCreatedAt) {
            if (this.loading) {
                return;
            }
            this.loading = true;
            this.$request
                .get("http://1.14.239.98/backend/api/v1/member", {
                    params: {
                        page: newPage,
                        size: 10,
                        sort: newSort,
                        order: newOrder,
                        keywords: newKeywords,
                        role_id: newRoleId,
                        tag_id: newTagId,
                        created_at: newCreatedAt,
                    },
                })
                .then((res) => {
                    this.loading = false;
                    console.log(res);
                    this.users = res.data.data.data;
                    this.total = res.data.data.total;
                    this.userRemark = res.data.user_remarks;
                    this.filterData.tags = res.data.tags;
                    this.filterData.roles = res.data.roles;
                });
        },

        // 通过接口给单个学员发送信息
        sendMessageMulti() {
            if (this.dialogLoading) {
                return;
            }
            this.dialogLoading = true;
            this.$request
                .post("http://1.14.239.98/backend/api/v1/member/message/multi", {
                    user_ids: [this.userID],
                    message: this.message,
                })
                .then((res) => {
                    this.dialogLoading = false;
                    // 提示发送成功
                    this.$message.success("发送成功");
                    this.message = null;
                    this.userID = null;
                    // 隐藏发消息对话框
                    this.dialogBatchSendMessagesVisible = false;
                    // 清除所有已点击的复选框
                    this.$refs.multipleTable.clearFilter();
                    //重新遍历页面数据
                    this.getUser(this.page, this.sort, this.order, this.keywords, this.role_id, this.tag_id, this.created_at);
                })
                .catch((e) => {
                    this.dialogLoading = false;
                    // 隐藏发消息对话框
                    this.dialogBatchSendMessagesVisible = false;
                    // 提示发送失败
                    this.$message.error(e.message);
                });
        },

        // 通过接口批量给多个学员发送信息
        batchSendMessageMulti() {
            if (this.dialogLoading) {
                return;
            }
            this.dialogLoading = true;
            this.$request
                .post("http://1.14.239.98/backend/api/v1/member/message/multi", {
                    user_ids: this.ids,
                    message: this.message,
                })
                .then((res) => {
                    this.dialogLoading = false;
                    // 提示发送成功
                    this.$message.success("发送成功");
                    this.message = null;
                    this.userID = null;
                    // 隐藏发消息对话框
                    this.dialogBatchSendMessagesVisible = false;
                    // 清除所有已点击的复选框
                    this.$refs.multipleTable.clearFilter();
                    //重新遍历页面数据
                    this.getUser(this.page, this.sort, this.order, this.keywords, this.role_id, this.tag_id, this.created_at);
                })
                .catch((e) => {
                    this.dialogLoading = false;
                    // 提示发送失败
                    this.$message.error(e.message);
                });
        },

        // 发消息
        sendMessage(item) {
            // 显示发消息对话框
            this.dialogBatchSendMessagesVisible = true;
            this.userID = item.id;
        },

        //批量发消息
        batchSendMessages() {
            if (this.ids == "") {
                this.$message.error("请选择需要发消息的学员");
                return;
            }
            // 显示发消息对话框
            this.dialogBatchSendMessagesVisible = true;
        },

        // 批量修改
        batchModification() {
            if (this.ids == "") {
                this.$message.error("请选择需要修改的学员");
                return;
            }
            this.dialogBatchModificationVisible = true;
        },

        // 清除修改项
        clearModification() {
            this.form.is_lock = null;
            this.form.tag_ids = [];
            this.form.role_id = null;
            this.form.role_expired_at = null;
        },

        // 提交修改
        submitModification() {
            if (this.dialogLoading) {
                return;
            }
            // 当选择了会员，却没选过期时间时
            if (this.form.role_id && !this.form.role_expired_at) {
                this.$message.error("请选择VIP过期时间");
                return;
            }
            // 当选择了过期时间，却没选会员时
            if (this.form.role_expired_at && !this.form.role_id) {
                this.$message.error("请选择VIP");
                return;
            }
            this.dialogLoading = true;

            this.$request
                .put("http://1.14.239.98/backend/api/v1/member/field/multi", {
                    user_ids: this.ids,
                    field: this.current,
                    value: this.current === "tag" ? null : this.form[this.current],
                    role_expired_at: this.form.role_expired_at,
                    tag_ids: [this.form.tag_ids],
                })
                .then((res) => {
                    this.dialogLoading = false;
                    // 提示发送成功
                    this.$message.success("发送成功");
                    this.clearModification();
                    this.current = null;
                    // 隐藏批量修改对话框
                    this.dialogBatchModificationVisible = false;
                    // 清除所有已点击的复选框
                    this.$refs.multipleTable.clearFilter();
                    //重新遍历页面数据
                    this.getUser(this.page, this.sort, this.order, this.keywords, this.role_id, this.tag_id, this.created_at);
                })
                .catch((e) => {
                    this.dialogLoading = false;
                    // 提示发送失败
                    this.$message.error(e.message);
                });
        },

        // 清空
        empty() {
            this.page = 1;
            this.keywords = null;
            this.role_id = null;
            this.tag_id = null;
            this.created_at = null;
            this.sort = this.sort;
            this.order = this.order;
            this.getUser(this.page, this.sort, this.order, this.keywords, this.role_id, this.tag_id, this.created_at);
            this.drawer = false;
        },

        // 筛选
        screen() {
            this.page = 1;
            this.keywords = this.keywords;
            this.role_id = this.role_id;
            this.tag_id = this.tag_id;
            this.created_at = this.created_at;
            this.sort = this.sort;
            this.order = this.order;
            this.getUser(this.page, this.sort, this.order, this.keywords, this.role_id, this.tag_id, this.created_at);
            this.drawer = false;
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    async created() {
        //页面加载时就从本地通过localstorage获取存储的token值
        this.token = localStorage.getItem("admin-token");
        // let userToken = `Bearer ${this.token}`;
        // console.log(userToken);
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.getUser();
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style scoped>
body > .el-container {
    margin-bottom: 40px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409eff;
}
.el-icon-arrow-down {
    font-size: 12px;
}
</style>

<style lang="less" scoped>
.container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    .logo {
        top: 0;
        width: 100%;
        height: 30px;
        padding-top: 30px;
        background-color: skyblue;
        img {
            width: 112px;
            height: 30px;
        }
    }
}
.contentBox {
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 100px;
    .meedu-main-body {
        width: 100%;
        background-color: #fff;
        overflow: hidden;
        .studentAvatarName {
            line-height: 40px;
            font-size: 17px;
            color: #303133;
        }
        .studentAvatarPhoto {
            float: left;
            margin-right: 10px;
        }
        .studentAvatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        .underline {
            padding-bottom: 5px;
            font-size: 14px;
        }
        .underline:hover {
            border-bottom: 1px solid #409eff;
        }
        .j-b-flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .studentKeywords {
                display: block;
            }
            .emptyingAndFiltering {
                margin-left: 10px;
            }
            .more {
                // height: 14px;
                font-size: 14px;
                font-weight: 400;
                color: #666;
                line-height: 14px;
                cursor: pointer;
                img {
                    width: 14px;
                    height: 14px;
                    margin-right: 5px;
                }
            }
        }
        .j-r-flex {
            display: flex;
            justify-content: right;
        }
        .n-padding-box {
            width: 100%;
            height: auto;
            float: left;
            padding: 30px;
            .title {
                width: 100%;
                height: 16px;
                font-size: 16px;
                font-weight: 400;
                color: #333;
                line-height: 16px;
                margin-bottom: 30px;
                display: flex;
            }
        }
        .check-num {
            font-size: 14px;
            color: #409eff;
            text-align: left;
        }
        .mb-30 {
            margin-bottom: 30px;
        }
        .d-flex {
            // min-width: 500px;
            display: flex;
            align-items: center;
        }
        .j-flex {
            display: flex;
            justify-content: center;
        }
        .widthLong {
            min-width: 810px;
        }
        .paging {
            text-align: center;
        }
        .ml-10 {
            margin-left: 10px;
        }
        .ml-5 {
            margin-left: 5px;
        }
        .w-100 {
            width: 100px;
        }
        .w-300 {
            width: 300px;
        }
        .w-400 {
            width: 400px;
        }
        .mt-20 {
            margin-top: 20px;
        }
        .mt-30 {
            margin-top: 30px;
        }
        .mr-20 {
            margin-right: 20px;
        }
        .el-item {
            flex: 1;
        }
    }
}
</style>
