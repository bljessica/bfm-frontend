<template>
  <view class="done-analysis-container">
    <view class="user-info-container" v-if="userInfo && analysisData.total">
      <image :src="userInfo.avatarUrl || '/static/images/default_avatar.png'" style="width: 80rpx;height: 80rpx;border-radius: 50%;grid-area: a;"></image>
      <span style="grid-area: b;font-size: 28rpx;font-weight: bold;">{{userInfo.nickName}}</span>
      <span style="grid-area: c;font-size: 20rpx;color: #999;">在书影音社区一共标记{{KIND_STATUS_NAME[kind]}}过</span>
      <span style="grid-area: d;font-weight: bold;font-size: 20rpx;text-align: center;">
        <span style="font-size: 40rpx;">{{analysisData.total}}</span><br />
        {{KIND_UNITS[kind] + KIND_NAMES[kind]}}
      </span>
    </view>
    <!-- 展示 -->
    <view class="recent-items-display" v-if="analysisData.recentDoneItems" style="position: absolute;top: 130rpx;left: 10rpx;right: 10rpx;height: 120rpx;margin-top: 30rpx;">
      <view class="recent-items-display__img-wrapper" 
        v-for="i in 9" 
        :key="i" 
        :style="{
          left: i > 4 ? 'unset' : 10 * (i + 1) + '%',
          right: i > 4 ? 10 * (9 - i) + '%' : 'unset',
          width: 120 * (1 - 0.08 * Math.abs(4 - i)) + 'rpx',
          height: 150 * (1 - 0.08 * Math.abs(4 - i)) + 'rpx',
          transform: i > 4 ? 'translateX(50%)' : 'translateX(-50%)',
          backgroundColor: analysisData.recentDoneItems[i] ? 'unset' : '#E3E3E3',
          zIndex: 10 - Math.abs(4 - i)
        }"
      >
        <image class="recent-items-display__img-wrapper__img" v-if="analysisData.recentDoneItems[i]" :src="analysisData.recentDoneItems[i].coverSrc"></image>
        <image v-else :src="`/static/images/analysis/analysis_${kind}.png`" style="width: 30rpx;height: 30rpx;z-index: inherit;" />
      </view>
    </view>
    <!-- 最常看的类型 -->
    <view class="type-info-container" v-if="sortedTypeTags.length" style="font-weight: bold;">
      <view class="analysis-item-title" style="margin-top: 230rpx;">最常{{KIND_STATUS_NAME[kind]}}的类型</view>
      <view v-for="item in sortedTypeTags" :key="item[0]" class="type-container" style="position: relative;margin-bottom: 4rpx;font-size: 20rpx;overflow: hidden;">
        <view class="type-container__type-container">
          <image :src="TYPE_ICONS_URL[kind][item[0]].imgUrl" style="width: 34rpx;height: 34rpx;border-radius: 50%;margin-right: 10rpx;"></image>
          <span>{{item[0]}}</span>
        </view>
        <view class="type-container__num-container">
          <view class="type-container__num-container__bgImg" :style="{right: 100 - item[1] / maxTypeNum * 100 + '%'}"></view>
          <view class="type-container__num-container__num">{{item[1]}}部</view>
        </view>
      </view>
    </view>
    <!-- 年份分布 -->
    <view class="publish-year-info-container" v-if="yearDataSeries.length">
      <view class="analysis-item-title" style="margin-bottom: 0;">{{KIND_NAMES[kind]}}年份分布</view>
      <view class="year-pie-chart">
		    <canvas canvas-id="canvasPie" id="canvasPie" class="year-pie-chart"></canvas>
      </view>
    </view>
    <!-- 地区分布 -->
    <view class="country-info-container" v-if="countryDataSeries.length">
      <view class="analysis-item-title">{{KIND_NAMES[kind]}}地区分布</view>
      <view class="country-arcbar-chart-wrapper">
			  <canvas v-for="i in 6" :key="i" :canvas-id="'canvasArcbar' + i" :id="'canvasArcbar' + i" class="country-arcbar-chart"></canvas>
      </view>
    </view>
    <!-- 暂无分析 -->
    <view v-if="!analysisData.total && !loading" style="font-size: 26rpx;font-weight: bold;text-align: center;margin-top: 20rpx;">暂无观影分析</view>
    <uni-load-more v-if="loading" iconType="circle" status="loading"></uni-load-more>
  </view>
</template>

<script>
import { KIND_STATUS_NAME, KIND_NAMES, KIND_UNITS, TYPE_ICONS_URL } from '@/constants/constants'
import uCharts from '@/components/uCharts/u-charts.js'

let canvaPie = null
let canvasArcbar0 = null
let canvasArcbar1 = null
let canvasArcbar2 = null
let canvasArcbar3 = null
let canvasArcbar4 = null
let canvasArcbar5 = null

export default {
  data () {
    return {
      kind: null,
      userInfo: null,
      KIND_STATUS_NAME,
      KIND_NAMES,
      KIND_UNITS,
      analysisData: {},
      TYPE_ICONS_URL,
      loading: false
    }
  },
  computed: {
    maxTypeNum () {
      if (this.analysisData?.itemInfos?.type) {
        return Math.max(...Object.values(this.analysisData.itemInfos.type))
      } 
      return 0
    },
    sortedTypeTags () {
      const arr = []
      if (this.analysisData?.itemInfos?.type) {
        Object.entries(this.analysisData.itemInfos.type).forEach(tmp => {
          if (tmp[1]) {
            arr.push([tmp[0], tmp[1]])
          }
        })
        arr.sort((a, b) => (b[1] - a[1]))
      }
      return arr
    },
    yearDataSeries () {
      if (this.analysisData?.itemInfos?.publishTime) {
        return Object.entries(this.analysisData.itemInfos.publishTime).map(tmp => {
          return {
            name: tmp[0],
            data: tmp[1],
            format: () => {
              return `${tmp[0]}s  ${tmp[1]}${KIND_UNITS[this.kind]}`
            }
          }
        }).sort((a, b) => (b.data - a.data))
      }
      return []
    },
    countryDataSeries () {
      if (this.analysisData?.itemInfos?.country) {
        const total = Object.values(this.analysisData.itemInfos.country).reduce((acc, num) => (acc + num), 0)
        const arr = Object.entries(this.analysisData.itemInfos.country).map((tmp, i) => {
          return {
            name: tmp[0],
            data: (tmp[1] / total).toFixed(2),
            color: (i % 3 === 0) ? '#FFAC2C' : (i % 3 === 1) ? '#38A94D' : '#2085E6'
          }
        }).sort((a, b) => (b.data - a.data))
        return arr.length > 6 ? arr.slice(0, 6) : arr
      }
      return [] 
    }
  },
  async onLoad (options) {
    this.kind = options.kind
  },
  async onShow () {
    this.loading = true
    let res = await this.$api.getUserInfo({
      openid: getApp().globalData.openid
    })
    this.userInfo = res.data.data
    res = await this.$api.getDoneItemsAnalysis({
      openid: getApp().globalData.openid,
      kind: this.kind
    })
    this.analysisData = res.data.data
    this.loading = false
    this.showYearPie()
    for (let i in this.countryDataSeries) {
      this.showCountryArcbar('canvasArcbar' + i, [this.countryDataSeries[i]])
    }
  },
  methods: {
    toJSON () {
      return this
    },
    showYearPie () {
      let that = this
      canvaPie = new uCharts({
        $this: that,
        canvasId: 'canvasPie',
        type: 'pie',
        fontSize: 11,
        padding: [0, 0, 0, 0],
        legend: {
          show: false
        },
        background: '#FFFFFF',
        pixelRatio: 1,
        series: that.yearDataSeries,
        animation: true,
        width: 300,
        height: 180,
        dataLabel: true,
        disablePieStroke: true,
        extra: {
          pie: {
            border: false,
            labelWidth:15
          }
        }
      })
    },
    showCountryArcbar (canvasId, chartDataSeries) {
      let that = this
      canvaPie = new uCharts({
        $this: that,
        canvasId: canvasId,
        type: 'arcbar',
        fontSize: 11,
        padding: [0, 0, 0, 0],
        legend: {
          show: false
        },
        background: '#FFFFFF',
        pixelRatio: 1,
        series: chartDataSeries,
        animation: true,
        width: 80,
        height: 80,
        dataLabel: true,
        title: {
          name: chartDataSeries[0].name,
          color: 'black',
          fontSize: 10
        },
        subtitle: {
          name: parseInt(chartDataSeries[0].data * 100) + '%',
          color: 'black',
          fontSize: 10
        },
        extra: {
          arcbar: {
            type: 'circle',
            backgroundColor:'#F6F6F6',
            startAngle: 1.5,
            width: 6 //圆弧的宽度
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.done-analysis-container {
  padding: 20rpx 40rpx;
}
.user-info-container {
  height: 80rpx;
  display: grid;
  grid-template-areas: 'a b d'
                       'a c d';
  grid-template-columns: 80rpx 3fr 1fr;
  grid-template-rows: 1.5fr 1fr;
  gap: 5rpx 10rpx;
}
.type-container__type-container {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 160rpx;
  height: 50rpx;
  background-color: #342309;
  border-radius: 15rpx 0 0 15rpx;
  z-index: 1;
}
.type-container__num-container {
  position: absolute;
  width: calc(100% - 160rpx);
  left: 160rpx;
  top: 0;
  height: 50rpx;
}
.type-container__num-container__bgImg {
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  border-radius: 0 15rpx 15rpx 0;
  background-image: linear-gradient(to right, #FFC46C, #FFF4E2);
  z-index: -1;
}
.type-container__num-container__num {
  line-height: 50rpx;
  margin-left: 10rpx;
  position: absolute;
}
.analysis-item-title {
  margin: 50rpx 0 30rpx 0;
  font-size:26rpx;
  font-weight: bold;
}
.year-pie-chart {
  width: 300px;
  height: 180px;
  margin: 0 auto;
}
.country-arcbar-chart-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 30rpx 20rpx;
}
.country-arcbar-chart {
  width: 80px;
  height: 80px;
}
.recent-items-display__img-wrapper {
  position: absolute; 
  bottom: 0;   
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rpx;
  overflow: hidden;
  border: 1px solid #ddd;
}
.recent-items-display__img-wrapper__img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: inherit;
}
</style>