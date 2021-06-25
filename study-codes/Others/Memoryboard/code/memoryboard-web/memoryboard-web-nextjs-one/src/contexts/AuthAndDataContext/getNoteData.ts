import { nanoid } from 'nanoid';

import { appApi } from '@shared/apis/appApi';
import { INote } from '@typifications/note';

const getNoteData = async (noteId: number) => {
  try {
    const note: { data: INote } = await appApi.get(
      `/notes/user/note/${noteId}`,
    );

    return {
      isRequestSuccessful: true,
      note: note.data,
    };
  } catch (error) {
    const errorMessage = {
      id: nanoid(),
      type: 'error',
      title: 'Error',
      content: error.response.data.message,
    };

    return {
      isRequestSuccessful: false,
      errorMessage: errorMessage,
    };
  }
};

export default getNoteData;
