const API_BASE = 'http://localhost:3000';
export default {
  communities: API_BASE + "/communities",
  communityGroups: API_BASE + "/communityGroups",
  createNotice: API_BASE + "/createNotice",
  getNotices: API_BASE + "/getNotices",
}
