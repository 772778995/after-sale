import { Database, QueryExecResult } from '@jlongster/sql.js'
export declare type LocalGroupMember = {
  [key: string]: any
}
export declare function localGroupMembers(db: Database): QueryExecResult[]
export declare function getGroupMemberInfoByGroupIDUserID(
  db: Database,
  groupID: string,
  userID: string,
): QueryExecResult[]
export declare function getAllGroupMemberList(db: Database): QueryExecResult[]
export declare function getAllGroupMemberUserIDList(
  db: Database,
): QueryExecResult[]
export declare function getGroupMemberCount(
  db: Database,
  groupID: string,
): QueryExecResult[]
export declare function getGroupSomeMemberInfo(
  db: Database,
  groupID: string,
  userIDList: string[],
): QueryExecResult[]
export declare function getGroupAdminID(
  db: Database,
  groupID: string,
): QueryExecResult[]
export declare function getGroupMemberListByGroupID(
  db: Database,
  groupID: string,
): QueryExecResult[]
export declare function getGroupMemberListSplit(
  db: Database,
  groupID: string,
  filter: number,
  offset: number,
  count: number,
): QueryExecResult[]
export declare function getGroupMemberOwnerAndAdmin(
  db: Database,
  groupID: string,
): QueryExecResult[]
export declare function getGroupMemberOwner(
  db: Database,
  groupID: string,
): QueryExecResult[]
export declare function getGroupMemberListSplitByJoinTimeFilter(
  db: Database,
  groupID: string,
  offset: number,
  count: number,
  joinTimeBegin: number | undefined,
  joinTimeEnd: number | undefined,
  userIDList: string[],
): QueryExecResult[]
export declare function getGroupOwnerAndAdminByGroupID(
  db: Database,
  groupID: string,
): QueryExecResult[]
export declare function getGroupMemberUIDListByGroupID(
  db: Database,
  groupID: string,
): QueryExecResult[]
export declare function insertGroupMember(
  db: Database,
  localGroupMember: LocalGroupMember,
): QueryExecResult[]
export declare function batchInsertGroupMember(
  db: Database,
  localGroupMember: LocalGroupMember[],
): QueryExecResult[]
export declare function deleteGroupMember(
  db: Database,
  groupID: string,
  userID: string,
): QueryExecResult[]
export declare function deleteGroupAllMembers(
  db: Database,
  groupID: string,
): QueryExecResult[]
export declare function updateGroupMember(
  db: Database,
  localGroupMember: LocalGroupMember,
): QueryExecResult[]
export declare function updateGroupMemberField(
  db: Database,
  groupID: string,
  userID: string,
  localGroupMember: LocalGroupMember,
): QueryExecResult[]
export declare function searchGroupMembers(
  db: Database,
  keyword: string,
  groupID: string,
  isSearchMemberNickname: boolean,
  isSearchUserID: boolean,
  offset: number,
  count: number,
): QueryExecResult[]
export declare function getUserJoinedGroupIDs(
  db: Database,
  userID: string,
): QueryExecResult[]
