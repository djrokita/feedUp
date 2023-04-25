export const generateBase64FromImage = (imageFile: File) => {
  const reader = new FileReader();
  const promise = new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = err => reject(err);
  });

  reader.readAsDataURL(imageFile);
  return promise;
};
