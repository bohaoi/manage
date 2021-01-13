import request from "@/utils/request";

export default {
  //获取会员列表接口
  getList() {
    return request({
      url: "/member/list",
      method: "get",
    });
  },
  //分页查询
  //pag当前页码，size每页显示条数，searchMap条件
  //后台要通过page和size统计本次请求响应的数据
  search(page, size, searchMap) {
    return request({
      url: "/member/list/search/page/size",
      method: "post",
      data: searchMap
    });
  }
};
