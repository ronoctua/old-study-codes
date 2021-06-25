interface IUpdateNotePermissionDTO {
  userId: string | number;
  noteId: string | number;
  permission: string;
}

export { IUpdateNotePermissionDTO };
