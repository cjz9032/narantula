export const parseUrl = (url: string) => {
  try {
    return new URL(url);
  } catch (_e) {
    return false;
  }
};
