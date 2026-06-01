export type GalleryPhoto = {
  id: number;
  src: string;
  alt: string;
  category: string;
  aspect: "portrait" | "landscape" | "square";
};

export const photos: GalleryPhoto[] = [
  { id: 1,  src: "/gallery/photo-1.png",  alt: "Photo 1",  category: "Portrait", aspect: "landscape" },
  { id: 2,  src: "/gallery/photo-2.jpg",  alt: "Photo 2",  category: "Portrait", aspect: "portrait"  },
  { id: 3,  src: "/gallery/photo-3.jpg",  alt: "Photo 3",  category: "Portrait", aspect: "portrait"  },
  { id: 4,  src: "/gallery/photo-4.jpg",  alt: "Photo 4",  category: "Portrait", aspect: "portrait"  },
  { id: 5,  src: "/gallery/photo-5.jpg",  alt: "Photo 5",  category: "Portrait", aspect: "landscape" },
  { id: 6,  src: "/gallery/photo-6.jpg",  alt: "Photo 6",  category: "Portrait", aspect: "portrait"  },
  { id: 7,  src: "/gallery/photo-7.jpg",  alt: "Photo 7",  category: "Portrait", aspect: "landscape" },
  { id: 8,  src: "/gallery/photo-8.jpg",  alt: "Photo 8",  category: "Portrait", aspect: "landscape" },
  { id: 9,  src: "/gallery/photo-9.jpg",  alt: "Photo 9",  category: "Portrait", aspect: "portrait"  },
  { id: 10, src: "/gallery/photo-10.jpg", alt: "Photo 10", category: "Portrait", aspect: "landscape" },
  { id: 11, src: "/gallery/photo-11.jpg", alt: "Photo 11", category: "Portrait", aspect: "portrait"  },
  { id: 12, src: "/gallery/photo-12.jpg", alt: "Photo 12", category: "Portrait", aspect: "landscape" },
  { id: 13, src: "/gallery/photo-13.jpg", alt: "Photo 13", category: "Portrait", aspect: "landscape" },
  { id: 14, src: "/gallery/photo-14.jpg", alt: "Photo 14", category: "Portrait", aspect: "landscape" },
  { id: 15, src: "/gallery/photo-15.jpg", alt: "Photo 15", category: "Portrait", aspect: "landscape" },
  { id: 16, src: "/gallery/photo-16.jpg", alt: "Photo 16", category: "Portrait", aspect: "landscape" },
  { id: 17, src: "/gallery/photo-17.jpg", alt: "Photo 17", category: "Portrait", aspect: "landscape" },
  { id: 18, src: "/gallery/photo-18.jpg", alt: "Photo 18", category: "Portrait", aspect: "portrait"  },
  { id: 19, src: "/gallery/photo-19.jpg", alt: "Photo 19", category: "Portrait", aspect: "square"    },
  { id: 20, src: "/gallery/photo-20.jpg", alt: "Photo 20", category: "Portrait", aspect: "portrait"  },
  { id: 21, src: "/gallery/photo-21.jpg", alt: "Photo 21", category: "Portrait", aspect: "landscape" },
  { id: 22, src: "/gallery/photo-22.jpg", alt: "Photo 22", category: "Portrait", aspect: "landscape" },
  { id: 23, src: "/gallery/photo-23.jpg", alt: "Photo 23", category: "Portrait", aspect: "landscape" },
];

export const categories = ["All", "Portrait", "Music Video", "Commercial", "Fashion"];
