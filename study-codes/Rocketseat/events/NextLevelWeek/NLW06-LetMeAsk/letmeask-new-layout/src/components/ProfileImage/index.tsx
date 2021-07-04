import { ImageElement } from './styles';

interface IProfileImageParms {
  imageUrl: string;
  title?: string;
}

export const ProfileImage = ({
  imageUrl,
  title,
}: IProfileImageParms): JSX.Element => (
  <ImageElement imageUrl={imageUrl} title={title} />
);
