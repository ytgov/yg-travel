const API_BASE = 'http://localhost:3000';
export default {
  communities: API_BASE + "/getCommunities",
  communityGroups: API_BASE + "/getCommunityGroups",
  departments: API_BASE + "/getDepartments",
  createNotice: API_BASE + "/createNotice",
  getNotices: API_BASE + "/getNotices",
  getNotice: API_BASE + "/getNotice/",
  getReport: API_BASE + "/reports/"
}
