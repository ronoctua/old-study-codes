interface ICreateUserTokenDTO {
  userId: string | number;
  refreshToken: string;
  expiresDate: Date;
}

export { ICreateUserTokenDTO };
