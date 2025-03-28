import JSZip from "jszip";

export const isWindow = typeof window !== 'undefined';

export const handleZipDownload = async (images) => {
  const zip = new JSZip();
  try {
    for (let index = 0; index < images.length; index++) {
      const response = await fetch(images[index])
      const blob = await response.blob()
      const filename = images[index].split('/').pop()
      zip.file(filename, blob)
    }
    const zipData = await zip.generateAsync({ type: 'blob', streamFiles: true })
    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipData);
    link.download = 'Catelog.zip'
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

  } catch (error) {
    console.error('Error downloading images as zip:', error);
  }
}
