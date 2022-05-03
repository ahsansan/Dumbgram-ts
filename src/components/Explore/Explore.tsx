import "./explore.css";
import Mansory from "./ExploreMasonry";

const ExploreMansory = () => {
  const imageUrls: string[] = [
    "/images/photos/Rectangle 6.png",
    "/images/photos/Rectangle 5.png",
    "/images/photos/Rectangle 10.png",
    "/images/photos/Rectangle 3.png",
    "/images/photos/Rectangle 9.png",
    "/images/photos/Rectangle 4.png",
    "/images/photos/Rectangle 8.png",
    "/images/photos/Rectangle 12.png",
  ];

  return (
    <div className="mansory-container-exp">
      <Mansory imageUrls={imageUrls}></Mansory>
    </div>
  );
};

export default ExploreMansory;
