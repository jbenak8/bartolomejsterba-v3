const galleryImageModules = import.meta.glob('/public/images/*/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export function getGalleryImages(folder: string) {
  const prefix = `/public/images/${folder}/`
  return Object.keys(galleryImageModules)
    .filter((path) => path.startsWith(prefix))
    .map((path) => {
      const fileName = path.substring(path.lastIndexOf('/') + 1)
      const src = galleryImageModules[path].replace(/^\/public/, '')
      return { src, alt: fileName, fileName }
    })
    .sort((a, b) => a.fileName.localeCompare(b.fileName))
    .map(({ src, alt }) => ({ src, alt }))
}
