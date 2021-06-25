import { nanoid } from 'nanoid';

import { appApi } from '@shared/apis/appApi';
import { INote } from '@typifications/note';

const updateNoteData = async (note: INote) => {
  try {
    const noteResponse = await appApi.get(`/notes/user/note/update/${note.id}`);

    return {
      isRequestSuccessful: true,
      note: noteResponse.data,
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

export default updateNoteData;
