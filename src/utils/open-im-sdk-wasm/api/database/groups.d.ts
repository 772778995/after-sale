export declare function insertGroup(localGroupStr: string): Promise<string>
export declare function deleteGroup(groupID: string): Promise<string>
export declare function updateGroup(
  groupID: string,
  localGroupStr: string,
): Promise<string>
export declare function getJoinedGroupList(): Promise<string>
export declare function getGroupInfoByGroupID(groupID: string): Promise<string>
export declare function getAllGroupInfoByGroupIDOrGroupName(
  keyword: string,
  isSearchGroupID: boolean,
  isSearchGroupName: boolean,
): Promise<string>
export declare function subtractMemberCount(groupID: string): Promise<string>
export declare function addMemberCount(groupID: string): Promise<string>
export declare function getJoinedWorkingGroupIDList(): Promise<string>
export declare function getJoinedWorkingGroupList(): Promise<string>
export declare function getGroupMemberAllGroupIDs(): Promise<string>
export declare function getGroups(groupIDListStr: string): Promise<string>
