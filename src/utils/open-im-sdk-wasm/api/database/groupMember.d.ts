export declare function getGroupMemberInfoByGroupIDUserID(
  groupID: string,
  userID: string,
): Promise<string>
export declare function getAllGroupMemberList(): Promise<string>
export declare function getAllGroupMemberUserIDList(): Promise<string>
export declare function getGroupMemberCount(groupID: string): Promise<string>
export declare function getGroupSomeMemberInfo(
  groupID: string,
  userIDListStr: string,
): Promise<string>
export declare function getGroupAdminID(groupID: string): Promise<string>
export declare function getGroupMemberListByGroupID(
  groupID: string,
): Promise<string>
export declare function getGroupMemberListSplit(
  groupID: string,
  filter: number,
  offset: number,
  count: number,
): Promise<string>
export declare function getGroupMemberOwnerAndAdmin(
  groupID: string,
): Promise<string>
export declare function getGroupMemberOwner(groupID: string): Promise<string>
export declare function getGroupMemberListSplitByJoinTimeFilter(
  groupID: string,
  offset: number,
  count: number,
  joinTimeBegin: number | undefined,
  joinTimeEnd: number | undefined,
  userIDListStr: string,
): Promise<string>
export declare function getGroupOwnerAndAdminByGroupID(
  groupID: string,
): Promise<string>
export declare function getGroupMemberUIDListByGroupID(
  groupID: string,
): Promise<string>
export declare function insertGroupMember(
  localGroupMemberStr: string,
): Promise<string>
export declare function batchInsertGroupMember(
  localGroupMemberStr: string,
): Promise<string>
export declare function deleteGroupMember(
  groupID: string,
  userID: string,
): Promise<string>
export declare function deleteGroupAllMembers(groupID: string): Promise<string>
export declare function updateGroupMember(
  localGroupMemberStr: string,
): Promise<string>
export declare function updateGroupMemberField(
  groupID: string,
  userID: string,
  localGroupMemberStr: string,
): Promise<string>
export declare function searchGroupMembers(
  keyword: string,
  groupID: string,
  isSearchMemberNickname: boolean,
  isSearchUserID: boolean,
  offset: number,
  count: number,
): Promise<string>
export declare function getUserJoinedGroupIDs(userID: string): Promise<string>
