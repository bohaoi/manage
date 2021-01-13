<template>
  <div>
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      style="margin-top: 20px"
    >
      <!-- 有prop才可以重置 -->
      <el-form-item prop="cardNum">
        <el-input
          v-model="searchMap.cardNum"
          placeholder="会员卡号"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="searchMap.name"
          placeholder="会员名称"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select
          v-model="searchMap.payType"
          placeholder="支付类型"
          style="width: 110px"
        >
          <!--key 标识， label 下拉显示的文本，vulue 表单值 -->
          <el-option
            v-for="option in payTypeOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <!-- value-format 是指定绑定值的格式 -->
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="searchMap.birthday"
          type="date"
          placeholder="出生日
期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData"
          >查询</el-button
        >
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border style="width: 100%" height="570">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column
        prop="cardNum"
        label="会员卡号"
        width="230"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="会员姓名"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="birthday"
        label="会员生日"
        width="170"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码"
        width="190"
      ></el-table-column>
      <el-table-column
        prop="integral"
        label="可用积分"
        width="130"
      ></el-table-column>
      <el-table-column
        prop="money"
        label="开卡金额"
        width="130"
      ></el-table-column>
      <el-table-column prop="payType" label="支付类型" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.payType | payTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址"></el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDele(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange()"
      @current-change="handleCurrentChange()"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import memberApi from "@/api/member";

//支付类型
const payTypeOptions = [
  { type: "1", name: "现金" },
  { type: "2", name: "微信" },
  { type: "3", name: "支付宝" },
  { type: "4", name: "银行卡" },
];

export default {
  data() {
    return {
      list: [],
      total: 0, //总记录数
      currentPage: 1,
      pageSize: 10,
      searchMap: {
        //条件查询绑定条件值
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
      },
      payTypeOptions,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    fetchData() {
      // memberApi.getList().then((response) => {
      memberApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then((response) => {
          // console.log(response.data);
          // this.list = response.data.data;
          const reqs = response.data;
          console.log(reqs);
          this.total = reqs.data.total;
          this.list = reqs.data.rows;
          console.log(this.total, this.list);
        });
    },
    handleEdit(id) {
      console.log("编辑", id);
    },
    handleDele(id) {
      console.log("删除", id);
    },
  },
  filters: {
    payTypeFilter(type) {
      const payobj = payTypeOptions.find((obj) => obj.type === type);
      return payobj ? payobj.name : null;
    },
  },
};
</script>
