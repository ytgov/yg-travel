const API_BASE = 'http://inf-docker-tst:3000';
export default {
  communities: API_BASE + "/communities",
  communityGroups: API_BASE + "/communityGroups",
  createNotice: API_BASE + "/createNotice",
  getNotices: API_BASE + "/getNotices",
  getNotice: API_BASE + "/getNotice/"
}
