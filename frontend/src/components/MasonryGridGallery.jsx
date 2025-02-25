import pic1 from '../assets/PhotosSectionPictures/etaypic-photosection1.PNG';
import pic2 from '../assets/PhotosSectionPictures/etaypic-photosection2.PNG';
import pic3 from '../assets/PhotosSectionPictures/etaypic-photosection3.PNG';
import pic4 from '../assets/PhotosSectionPictures/etaypic-photosection4.PNG';
import pic5 from '../assets/PhotosSectionPictures/etaypic-photosection5.JPG';
import pic6 from '../assets/PhotosSectionPictures/etaypic-photosection6.JPG';
import pic7 from '../assets/PhotosSectionPictures/etaypic-photosection7.jpg';
import pic8 from '../assets/PhotosSectionPictures/etaypic-photosection8.jpg';
import pic9 from '../assets/PhotosSectionPictures/etaypic-photosection9.PNG';
import pic10 from '../assets/PhotosSectionPictures/etaypic-photosection10.PNG';
import pic11 from '../assets/PhotosSectionPictures/etaypic-photosection11.PNG';
import pic12 from '../assets/PhotosSectionPictures/etaypic-photosection12.jpg';

const images = [
  [pic1, pic2, pic3],
  [pic4, pic5, pic6],
  [pic7, pic8, pic9],
  [pic10, pic11, pic12],
];

export function MasonryGridGallery() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((column, index) => (
        <div key={index} className="grid gap-4">
          {column.map((image, imgIndex) => (
            <img
              key={imgIndex}
              className="w-full aspect-[3/4] rounded-lg object-cover"
              src={image}
              alt={`gallery-photo-${imgIndex}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
