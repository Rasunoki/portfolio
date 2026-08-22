export type GalleryCategory = "Portrait" | "Street" | "Nature" | "Still Life";

export type GalleryPhoto = {
  id: number;
  src: string;
  alt: string;
  category: GalleryCategory;
  /** Intrinsic pixel size — drives the layout so frames are never cropped. */
  width: number;
  height: number;
};

export const photos: GalleryPhoto[] = [
  { id: 1,  src: "/gallery/photo-1.png",  width: 943,  height: 612,  category: "Street",     alt: "A cyclist and a runner moving away down a railed bridge walkway under an overcast sky" },
  { id: 2,  src: "/gallery/photo-2.jpg",  width: 1536, height: 2048, category: "Portrait",   alt: "Tight close-up of a tabby cat looking just past the lens" },
  { id: 3,  src: "/gallery/photo-3.jpg",  width: 960,  height: 1280, category: "Portrait",   alt: "Young man in sunglasses stretching a hand toward the camera beneath a covered walkway" },
  { id: 4,  src: "/gallery/photo-4.jpg",  width: 960,  height: 1280, category: "Portrait",   alt: "Tighter frame of the same reaching hand, a second figure standing behind" },
  { id: 5,  src: "/gallery/photo-5.jpg",  width: 1280, height: 960,  category: "Street",     alt: "Group of friends photographed from behind, looking out over city lights at dusk" },
  { id: 6,  src: "/gallery/photo-6.jpg",  width: 960,  height: 1280, category: "Street",     alt: "Tilted handheld frame of friends standing above a city at night" },
  { id: 7,  src: "/gallery/photo-7.jpg",  width: 1280, height: 960,  category: "Street",     alt: "Motion-blurred frame of friends walking together, caught mid-stride" },
  { id: 8,  src: "/gallery/photo-8.jpg",  width: 1280, height: 960,  category: "Street",     alt: "Long-exposure blur of the same group moving across a pale concrete street" },
  { id: 9,  src: "/gallery/photo-9.jpg",  width: 960,  height: 1280, category: "Portrait",   alt: "Figure silhouetted against a violet sunset with transmission pylons behind" },
  { id: 10, src: "/gallery/photo-10.jpg", width: 1280, height: 960,  category: "Nature",     alt: "Red hibiscus in bloom beside a metal railing, greenery behind" },
  { id: 11, src: "/gallery/photo-11.jpg", width: 960,  height: 1280, category: "Portrait",   alt: "Two people posing on graffiti-covered ground, shot from directly above" },
  { id: 12, src: "/gallery/photo-12.jpg", width: 1280, height: 960,  category: "Still Life", alt: "Handwritten note reading DATE? laid on green leaves with a paper rose" },
  { id: 13, src: "/gallery/photo-13.jpg", width: 1280, height: 960,  category: "Portrait",   alt: "Two people sitting inside a white latticed gazebo in warm afternoon light" },
  { id: 14, src: "/gallery/photo-14.jpg", width: 1280, height: 720,  category: "Street",     alt: "Bicycle propped against a concrete wall at the edge of an empty road" },
  { id: 15, src: "/gallery/photo-15.jpg", width: 1280, height: 960,  category: "Street",     alt: "Blurred figure standing in a field at dusk, coloured bokeh scattered across the foreground" },
  { id: 16, src: "/gallery/photo-16.jpg", width: 1280, height: 960,  category: "Portrait",   alt: "Person silhouetted against a deep blue twilight sky above a treeline" },
  { id: 17, src: "/gallery/photo-17.jpg", width: 997,  height: 607,  category: "Portrait",   alt: "Two people lying head to head on sunlit grass, photographed from above" },
  { id: 18, src: "/gallery/photo-18.jpg", width: 960,  height: 1280, category: "Street",     alt: "Low-angle frame of friends sitting on top of a water tank against a bright blue sky" },
  { id: 19, src: "/gallery/photo-19.jpg", width: 1280, height: 1280, category: "Street",     alt: "Night interior of a car, dashboard glow lighting the passengers" },
  { id: 20, src: "/gallery/photo-20.jpg", width: 960,  height: 1280, category: "Street",     alt: "Two silhouettes against a wall at night, lit by a single overhead lamp beside a no-parking sign" },
  { id: 21, src: "/gallery/photo-21.jpg", width: 1280, height: 960,  category: "Street",     alt: "Three figures silhouetted on a ridge above distant city lights" },
  { id: 22, src: "/gallery/photo-22.jpg", width: 1280, height: 720,  category: "Nature",     alt: "Flame tree branches in orange bloom against a pale sky" },
  { id: 23, src: "/gallery/photo-23.jpg", width: 1280, height: 960,  category: "Portrait",   alt: "Person in a pink tracksuit on concrete steps at night, a hard light flaring across the frame" },
];

/**
 * Derived from the photos themselves so a filter can never render an empty
 * grid — adding or recategorising a photo updates the filter bar for free.
 */
export const categories: ["All", ...GalleryCategory[]] = [
  "All",
  ...(Array.from(new Set(photos.map((p) => p.category))) as GalleryCategory[]),
];
