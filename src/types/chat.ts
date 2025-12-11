export interface ISaveChatRequest {
  senderSeq: number;
  receiverSeq: number;
  chatUniqueType: string;
}

export interface IChatFile {
  fileUrl: string;
}
