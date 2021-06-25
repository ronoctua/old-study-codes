interface IShareUserNoteDTO {
  userId: string | number;
  noteId: string | number;
  permission: 'see' | 'edit';
}

export { IShareUserNoteDTO };
