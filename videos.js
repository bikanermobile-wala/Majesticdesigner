import { images } from './images'

// Add future videos by calling makeVideo(...) and adding it to the array below.
const makeVideo = ({ id, cloudName, publicId, title, description, poster }) => ({
  id,
  title,
  description,
  // Supplied Cloudinary player embed (also used as automatic fallback)
  embedUrl: `https://player.cloudinary.com/embed/?cloud_name=${cloudName}&public_id=${publicId}`,
  // Direct file URL used by the custom autoplay player
  src: `https://res.cloudinary.com/${cloudName}/video/upload/q_auto/${publicId}.mp4`,
  poster: poster || `https://res.cloudinary.com/${cloudName}/video/upload/so_0/${publicId}.jpg`,
})

export const videos = [
  makeVideo({
    id: 'majestic-presentation',
    cloudName: 'vsk4n3n6',
    publicId: 'r07qxo_-_R_Download',
    title: 'The Majestic Presentation',
    description: 'A cinematic glimpse into the Majestic Designer experience.',
    poster: images.hero,
  }),
]

export const featuredVideo = videos[0]
