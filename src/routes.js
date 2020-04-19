import Home from './components/Home.vue';
import Gallery from './components/Gallery.vue';
import GalleryItem from './components/GalleryItem.vue';

export const routes = [
  { path: '/', component: Home },
  { path: '/gallery', component: Gallery },
  { path: '/gallery/:photoId', component: GalleryItem }
];
