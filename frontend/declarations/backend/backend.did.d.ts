import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Note {
  'id' : bigint,
  'title' : string,
  'content' : string,
  'category' : [] | [string],
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export interface _SERVICE {
  'addCategory' : ActorMethod<[string], Result>,
  'addNote' : ActorMethod<[string, string, [] | [string]], Result>,
  'getCategories' : ActorMethod<[], Array<string>>,
  'getNotes' : ActorMethod<[], Array<Note>>,
  'removeCategory' : ActorMethod<[string], Result>,
  'updateNote' : ActorMethod<[bigint, string, string, [] | [string]], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
