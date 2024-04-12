export async function imageToBlob(url: string) {
  const response = await fetch(url);

  return await response.blob();
}
