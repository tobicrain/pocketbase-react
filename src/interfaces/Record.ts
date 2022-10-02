export default interface Record {
  id?: string;
  created?: string;
  updated?: string;
  '@collectionId'?: string;
  '@collectionName'?: string;
  '@expand'?: Expand;
}

export interface Expand {}
