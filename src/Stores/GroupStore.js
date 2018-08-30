class GroupStore {

  joinGroup(data) {
    const { groupId, shareEmail } = data;
    return window.API.post(`/api/groups/${groupId}/join/`, {default_share_email: shareEmail});
  }

  getGroup(groupId) {
    return window.API.get(`/api/groups/${groupId}/`).then((res)=> {
      return res.data
    });
  }

}

export default GroupStore;
