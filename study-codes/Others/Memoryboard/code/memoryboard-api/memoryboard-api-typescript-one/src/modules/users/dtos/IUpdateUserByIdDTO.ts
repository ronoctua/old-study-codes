interface IUpdateUserByIdDTO {
  userId: string | number;
  newPassword: string;
  newUsername: string;
  newEmail: string;
  newTheme: string;
}

export { IUpdateUserByIdDTO };
