const API_BASE = 'api/v1';
export default {
  communities: API_BASE + "/getCommunities",
  communityGroups: API_BASE + "/getCommunityGroups",
  departments: API_BASE + "/getDepartments",
  createNotice: API_BASE + "/createNotice",
  getNotices: API_BASE + "/getNotices",
  updateNotice: API_BASE + "/updateNotice",
  getNotice: API_BASE + "/getNotice/",
  getReport: API_BASE + "/reports/",
  getEmails: API_BASE + "/getEmails",
  getEmailsByCommunity: API_BASE + "/getEmailsByCommunity/",
  createEmail: API_BASE + "/createEmail",
  updateEmail: API_BASE + "/updateEmail/"
}
