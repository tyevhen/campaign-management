type Tag = {
  name: string;
};

type TagUpdateResult = {
  tagsToDisconnect: { name: string }[];
  tagsToConnectOrCreate: {
    where: { name: string };
    create: { name: string };
  }[];
};

const prepareTagsUpdatePayload = (
  currentTags: Tag[],
  newTags: string[]
): TagUpdateResult => {
  const currentTagNames = currentTags.map((tag) => tag.name);

  const tagsToDisconnect = currentTagNames
    .filter((tag) => !newTags.includes(tag))
    .map((name) => ({ name }));

  const tagsToConnectOrCreate = newTags.map((tag) => ({
    where: { name: tag },
    create: { name: tag },
  }));

  return { tagsToDisconnect, tagsToConnectOrCreate };
};

export default prepareTagsUpdatePayload;