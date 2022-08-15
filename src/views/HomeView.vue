<template>
    <div>
        <el-row class="box">
            <el-col :span="8">
                <div class="today">
                    <span>今日收入</span>
                    <p>{{ homepage.today_paid_sum }}</p>
                    <div>
                        <span>昨日收入:&nbsp;{{ homepage.yesterday_paid_sum }}</span>
                        <span v-if="homepage"
                            >较昨日:<strong :class="DataComparison >= 0 ? 'up' : 'down'">{{ DataComparison | toPercent }}</strong></span
                        >
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="today">
                    <span>今日付费用户</span>
                    <p>{{ homepage.today_paid_user_num }}</p>
                    <div>
                        <span>昨日付费用户:&nbsp;{{ homepage.yesterday_paid_user_num }}</span>
                        <span v-if="homepage"
                            >较昨日:<strong :class="PayingUser >= 0 ? 'up' : 'down'">{{ PayingUser | toPercent }}</strong></span
                        >
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="count">
                    <span>总用户</span>
                    <p class="ppp">{{ homepage.user_count }}</p>
                    <div>
                        <span v-if="homepage"
                            >今日新增:<strong :class="NewlyIncreased >= 0 ? 'up' : 'down'">{{ NewlyIncreased | toPercent }}</strong></span
                        >
                    </div>
                </div>
                <div class="count">
                    <span>本月收益</span>
                    <p>{{ homepage.this_month_paid_sum }}</p>
                    <div>
                        <span v-if="homepage"
                            >较上月:<strong :class="monthPaidPercent >= 0 ? 'up' : 'down'">{{ monthPaidPercent | toPercent }}</strong></span
                        >
                    </div>
                </div>
            </el-col>
        </el-row>
        <!-- 中间跳转 -->
        <el-row class="heaher">
            <el-col :span="24">
                <div class="kuai">快速访问</div>
                <div class="navItem">
                    <router-link to="/course/vod">
                        <img src="@/assets/home/demand.png" alt="" />
                        <span>录播课</span>
                    </router-link>
                </div>
            </el-col>
        </el-row>
        <el-row class="centent">
            <el-col :span="24">
                <div class="kuai">统计分析</div>
                <div class="btn">
                    <el-button v-for="item in contions" :key="item.id" style="margin-right: 30px" :type="btnName === item.id ? 'primary' : ''" @click.stop="getEchartsData(item.id, time)">
                        {{ item.btnName }}</el-button
                    >
                </div>
                <div class="block">
                    <el-date-picker
                        v-model="time"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                    />
                    <el-button type="primary" @click.stop="screening(time)">筛选</el-button>
                </div>
                <div ref="echartsEle" style="width: 100%; height: 300px; margin-left: -100px"></div>
            </el-col>
        </el-row>
        <div class="homeFooter">
            <p>Powered By MeEdu</p>
            <p>
                <span>PHP{{ database.php_version }}</span>
                <span>主程序{{ database.meedu_version }}</span>
                <span>后管v4.6.3</span>
            </p>
        </div>
    </div>
</template>

<script>
//引入echarts组件库
import * as echarts from "echarts";
// echarts
export default {
    data() {
        return {
            database: "",
            homepage: "",
            myChart: null,
            option: null,
            rchart: "",
            btnName: 1,
            contions: [
                { id: 1, btnName: "每日注册用户", chartLegend: "新注册用户" },
                { id: 2, btnName: "每日创建订单", chartLegend: "每日新增订单量" },
                { id: 3, btnName: "每日已支付订单", chartLegend: "每日支付订单量" },
                { id: 4, btnName: "每日营收", chartLegend: "每日支付订单总额" },
            ],
            time: [], // 图表时间筛选
            pickerOptions: {
                disabledDate: (time) => time.getTime() > Date.now(),
            },
        };
    },
    //计算shux
    computed: {
        // 今日收入百分比 较昨日
        DataComparison() {
            if (this.homepage.today_paid_sum === 0 && this.homepage.yesterday_paid_sum === 0) {
                return 0;
            }
            const percent = (this.homepage.today_paid_sum - this.homepage.yesterday_paid_sum) / this.homepage.yesterday_paid_sum;
            return percent;
        },
        // 今日付费用户百分比 较昨日
        PayingUser() {
            if (this.homepage.today_paid_user_num === 0 && this.homepage.yesterday_paid_user_num === 0) {
                return 0;
            }
            const percent = (this.homepage.today_paid_user_num - this.homepage.yesterday_paid_user_num) / this.homepage.yesterday_paid_user_num;
            return percent;
        },
        // 新增用户百分比
        NewlyIncreased() {
            if (this.homepage.today_register_user_count === 0 && this.homepage.user_count === 0) {
                return 0;
            }
            const percent = this.homepage.today_register_user_count / this.homepage.user_count;
            return percent;
        },
        // 本月收入百分比
        monthPaidPercent() {
            if (this.homepage.this_month_paid_sum === 0 && this.homepage.last_month_paid_sum === 0) {
                return 0;
            }
            const percent = (this.homepage.this_month_paid_sum - this.homepage.last_month_paid_sum) / this.homepage.last_month_paid_sum;
            return percent;
        },
    },

    mounted() {
        this.getEchartsData(this.btnName, this.time);
    },
//过滤器把小数点转为百分比
    filters: {
        toPercent: function (point) {
            var str = Number(point * 100).toFixed(1);
            str += "%";
            return str;
        },
    },
    methods: {
     // 主页顶部内容
        async getAccess() {
            const res = await this.$request.get("/dashboard");
            if (res.status === 0) {
                this.homepage = res.data;
            }
        },
        // 初始化 起始时间
        Beginner() {
            const now = new Date();
            const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
            this.time[0] = `${sevenDaysAgo.getFullYear()}-${sevenDaysAgo.getMonth() + 1}-${sevenDaysAgo.getDate()}`;
            this.time[1] = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        },
        // 统计分析
        async getEchartsData(key, time) {
            if (time == null) {
                this.$message("请选择起始时间!");
                return;
            }
            this.btnName = key;
            switch (key) {
                case 1:
                    // 注册用户
                    const arr1 = await this.$request.get("/statistic/userRegister", {
                        params: { start_at: time[0], end_at: time[1] },
                    });
                    if (arr1.status === 0) {
                        this.rchart = arr1.data;
                    }
                    break;
                case 2:
                    // 创建订单
                    const arr2 = await this.$request.get("/statistic/orderCreated", {
                        params: { start_at: time[0], end_at: time[1] },
                    });
                    if (arr2.status === 0) {
                        this.rchart = arr2.data;
                    }
                    break;
                case 3:
                    //已支付订单
                    const arr3 = await this.$request.get("/statistic/orderPaidCount", {
                        params: { start_at: time[0], end_at: time[1] },
                    });
                    if (arr3.status === 0) {
                        this.rchart = arr3.data;
                    }
                    break;
                case 4:
                    // 营收
                    const arr4 = await this.$request.get("/statistic/orderPaidSum", {
                        params: { start_at: time[0], end_at: time[1] },
                    });
                    if (arr4.status === 0) {
                        this.rchart = arr4.data;
                    }
                    break;
                default:
                    break;
            }
            this.drawEcharts(this.rchart.labels, this.rchart.dataset);
        },
            // 系统信息
        async xiTon() {
            const res = await this.$request.get("/dashboard/system/info");
            if (res.status === 0) {
                this.database = res.data;
            }
        },
       
        // 时间筛选
        screening() {
            this.getEchartsData(this.btnName, this.time);
        },
        // echarts
        drawEcharts(xAxisData, seriesData) {
            // 基于准备好的dom，初始化echarts实例,页面中不存在图表的时候才创建
            if (this.myChart === null) {
                this.myChart = echarts.init(this.$refs.echartsEle);
            }
            // 指定图表的配置项和数据
            this.option = {
                tooltip: {},
                legend: {
                    data: [this.contions[this.btnName - 1].chartLegend],
                    x: "right",
                    left: 800,
                },
                xAxis: {
                    type: "category",
                    data: xAxisData,
                },
                yAxis: {},
                series: [
                    {
                        name: this.contions[this.btnName - 1].chartLegend,
                        type: "line",
                        data: seriesData,
                    },
                ],
            };
            // 使用刚指定的配置项和数据显示图表。
            this.myChart.setOption(this.option);
        },
    },
    created() {
        this.Beginner();
        this.xiTon();
        this.getAccess();
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

<style lang="less" scoped>
.box {
    width: 100%;
    height: 204px;
    display: flex;
    overflow: hidden;

    strong {
        margin-left: 10px;

        &.up {
            color: #3ca7fa;
        }

        &.down {
            color: #ff5858;
        }
    }

    & > div {
        width: 32.5%;
        height: 100%;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 hsl(0deg 0% 40% / 5%);
        border-radius: 8px;
        padding: 20px;
        margin-right: 20px;
        text-align: left;

        &:last-of-type {
            margin-right: 0;
            background-color: #f1f2f9;
            padding: 0;
        }

        .today {
            p {
                width: 100%;
                height: 36px;
                line-height: 36px;
                padding-left: 10px;
                font-size: 36px;
                font-weight: 600;
                color: #333;
            }

            span {
                display: inline-block;
                width: 100%;
                padding-left: 10px;
                font-size: 16px;
                font-weight: 400;
                color: #666;
                margin-bottom: 40px;
            }

            & > div {
                height: 42px;
                line-height: 42px;
                display: flex;
                background-color: #f1f2f9;
                margin-top: 30px;

                span {
                    margin-bottom: 0;
                }
            }
        }

        .count {
            height: calc((100% - 20px) / 2);
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #fff;
            box-shadow: 0 2px 4px 0 hsl(0deg 0% 40% / 5%);
            border-radius: 8px;
            padding: 0 30px;

            &:first-of-type {
                margin-bottom: 20px;
            }

            p {
                font-size: 38px;
                font-weight: 600;
                color: #333;
            }
            .ppp {
                padding-right: 100px;
            }
            span {
                display: inline-block;
                font-size: 16px;
                font-weight: 400;
                color: #666;
            }
        }
    }
}

.heaher {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 212px;
    background: #fff;
    box-shadow: 0 2px 4px 0 hsl(0deg 0% 40% / 5%);
    border-radius: 8px;
    margin-top: 20px;
    padding: 66px 100px 30px 100px;

    .navItem {
        cursor: pointer;
        position: relative;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        width: 80px;
        height: 116px;

        img {
            width: 80px;
            height: 80px;
            margin-bottom: 20px;
        }

        span {
            width: 80px;
            height: 16px;
            font-size: 16px;
            font-weight: 400;
            color: #333;
            line-height: 16px;
            text-align: center;
            padding-left: 18px;
        }
    }
}

.centent {
    width: 100%;
    height: 477px;
    background: #fff;
    box-shadow: 0 2px 4px 0 hsl(0deg 0% 40% / 5%);
    border-radius: 8px;
    margin-top: 20px;
    padding: 76px 30px 0 30px;
    box-sizing: border-box;

    & > div {
        text-align: left;
    }

    .block {
        margin-top: 50px;

        button {
            margin-left: 10px;
        }
    }
}

.homeFooter {
    width: 100%;
    height: auto;
    text-align: center;
    margin-top: 50px;
    font-size: 16px;
    font-weight: 300;
    color: #999;
    line-height: 16px;
    padding-bottom: 15px;

    p {
        margin-bottom: 10px;

        span {
            font-size: 12px;
            font-weight: 300;
            color: #999;
            margin-right: 10px;
        }
    }
}

.kuai {
    position: absolute;
    height: 16px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    line-height: 16px;
    top: 30px;
    left: 30px;
}
</style>
