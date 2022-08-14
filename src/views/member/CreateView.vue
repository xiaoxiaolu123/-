<template>
    <div class="meedu-main-body">
        <div class="back-bar-box mb-30" title="添加学员">
            <div class="btn-back" @click.stop="goBack">
                <i class="el-icon-back"></i>
                返回
            </div>
            <div class="line"></div>
            <div class="name">添加学员</div>
        </div>

        <div class="float-left">
            <el-form ref="form" :model="user" :rules="rules" label-width="200px">
                <!-- 上传头像 -->
                <el-form-item label="头像" prop="avatar">
                    <div class="d-flex">
                        <!-- <el-upload v-model="user.avatar" :width="100" :height="100" action="#"> -->
                        <el-button slot="trigger" @click.stop="sendImg">上传图片</el-button>
                        <span class="ml-10 helper-text" style="color: #7f7f7f">
                            <i class="el-icon-info"></i>
                            <span class="ml-5">建议尺寸：100x100</span>
                        </span>
                        <!-- </el-upload> -->
                    </div>
                    <!-- 选择的头像 -->
                    <div class="imgBox" v-if="user.avatar">
                        <img :src="user.avatar" alt="" />
                    </div>
                </el-form-item>

                <!-- 昵称 -->
                <el-form-item label="昵称" prop="nick_name">
                    <el-input v-model="user.nick_name" class="w-200px"></el-input>
                </el-form-item>

                <!-- 手机号 -->
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="user.mobile" class="w-200px"></el-input>
                </el-form-item>

                <!-- 密码 -->
                <el-form-item label="密码" prop="password">
                    <el-input v-model="user.password" class="w-200px"></el-input>
                </el-form-item>

                <!-- 登录锁定 -->
                <el-form-item prop="is_lock">
                    <span slot="label">
                        <el-tooltip class="item" effect="dark" content="锁定学员无法登录" placement="top-start">
                            <span class="span-box">
                                <span>登录锁定</span>
                                <i class="el-icon-question ml-5"></i>
                            </span>
                        </el-tooltip>
                    </span>
                    <el-switch v-model="user.is_lock" :active-value="1" :inactive-value="0"> </el-switch>
                </el-form-item>

                <!-- VIP -->
                <el-form-item label="VIP">
                    <el-select v-model="user.role_id">
                        <el-option v-for="(item, index) in roles" :key="index" :label="item.name" :value="item.id"> </el-option>
                    </el-select>
                </el-form-item>

                <!-- 会员过期时间 -->
                <el-form-item label="VIP到期时间" v-if="user.role_id">
                    <el-date-picker v-model="user.role_expired_at" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-form>
        </div>

        <!-- 保存   取消 -->
        <div class="bottom-menus">
            <div class="bottom-menus-box">
                <el-button type="primary" class="save" @click.stop="addMember">保存</el-button>
                <el-button type="default" class="ml-24" @click.stop="goBack">取消</el-button>
            </div>
        </div>

        <!-- 选择图片弹窗 -->
        <div>
            <SelectImg @childSendDate="getData" :sendState="state"></SelectImg>
        </div>
    </div>
</template>

<script>
import UploadImage from "@/components/UploadImage.vue";
import SelectImg from "@/components/SelectImg.vue";

export default {
    components: {
        UploadImage,
        SelectImg,
    },
    data() {
        return {
            user: {
                // 头像
                avatar: null,
                // 昵称
                nick_name: null,
                // 手机号
                mobile: null,
                // 密码
                password: null,
                // VIP
                role_id: null,
                // 会员过期日期
                role_expired_at: null,
                // 登录锁定
                is_lock: null,
            },
            rules: {
                avatar: [
                    {
                        required: true,
                        message: "请上传头像",
                        trigger: "blur",
                    },
                ],
                nick_name: [
                    {
                        required: true,
                        message: "请输入昵称",
                        trigger: "blur",
                    },
                ],
                mobile: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                ],
            },
            roles: [],
            loading: false,

            // 图片选择弹窗状态
            state: false,
            // 子组件获取的图片
            img: "",
            // 子组件传过来的数据
            childDate: {},
        };
    },
    mounted() {
        this.createMember();
    },
    methods: {
        // 返回上一页
        goBack: function () {
            // window.history.go(-1)
            // 表示返回上一页
            this.$router.go(-1);
        },

        //获取创建学员所需数据
        createMember() {
            this.$request
                .get("http://1.14.239.98/backend/api/v1/member/create", {
                    params: {},
                })
                .then((res) => {
                    this.roles = res.data.roles;
                    // console.log(this.roles);
                });
        },

        // 接收子组件数据（state  和 图片id）
        getData: function (data) {
            this.childDate = data;
            this.state = this.childDate.childSate;
            this.user.avatar = this.childDate.imgUrl;
            console.log(this.user.avatar);
        },

        // 上传图片
        sendImg: function () {
            this.$nextTick(() => {
                this.state = !this.state;
                // console.log(this.state);
            });
        },

        // 添加学员
        addMember() {
            if (this.loading) {
                return;
            }
            this.loading = true;

            this.$request
                .post("http://1.14.239.98/backend/api/v1/member", {
                    // 头像
                    avatar: this.user.avatar,
                    // 登录锁定
                    is_lock: this.user.is_lock,
                    // 手机号
                    mobile: this.user.mobile,
                    // 昵称
                    nick_name: this.user.nick_name,
                    // 密码
                    password: this.user.password,
                    // 会员过期时间
                    role_expired_at: this.user.role_expired_at,
                    // VIP
                    role_id: this.user.role_id,
                })
                .then(() => {
                    this.$message.success("保存成功");
                    // 返回上一页
                    this.$router.go(-1);
                })
                .catch((e) => {
                    this.loading = false;
                    this.$message.error(e.message);
                });
        },
    },
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
    .back-bar-box {
        width: 100%;
        height: auto;
        float: left;
        display: flex;
        align-items: center;
        // 返回
        .btn-back {
            font-size: 14px;
            font-weight: 400;
            color: #333;
            cursor: pointer;
        }
        // 分割线
        .line {
            width: 1px;
            height: 14px;
            background-color: #d8d8d8;
            margin-right: 15px;
            margin-left: 15px;
        }
        // 标题
        .name {
            font-size: 14px;
            font-weight: 600;
            color: #333;
        }
    }
    .el-form {
        display: block;
        margin-top: 0em;
    }
    .el-form {
        .el-form-item {
            margin-bottom: 22px;
            .el-form-item {
                line-height: 40px;
                font-size: 14px;
                display: block;
                .el-upload {
                    display: flex;
                    flex-direction: row;
                    .el-button {
                        font-weight: 400;
                    }
                }
            }
        }
    }
    .bottom-menus {
        width: 100%;
        height: 1px;
        float: left;
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
        }
    }
    .float-left {
        width: 100%;
        height: auto;
        float: left;
    }
    .mb-30 {
        margin-bottom: 30px;
    }
    .ml-24 {
        margin-left: 24px;
    }
    .ml-10 {
        margin-left: 10px;
    }
    .ml-5 {
        margin-left: 5px;
    }
    .w-200px {
        width: 200px;
    }
    .imgBox {
        // background-color: yellow;
        width: 200px;
        height: 150px;
        margin-top: 60px;
        margin-left: 0px;
        margin-bottom: 0px;
        img {
            width: 200px;
            height: 150px;
        }
    }
}
</style>
