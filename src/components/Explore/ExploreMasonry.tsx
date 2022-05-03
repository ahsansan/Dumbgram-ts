import "./explore.css";
import "aos/dist/aos.css";
import { useEffect, FC } from "react";
const Aos = require("aos");

interface Props {
  imageUrls: string[];
}

const MansoryForExplore: FC<Props> = (props) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="masonry-style-exp" data-aos="fade-up">
      {props.imageUrls.map((img, index) => (
        <img
          src={process.env.PUBLIC_URL + `${img}`}
          key={index}
          className="images-explore"
          alt="Gambar Explore"
        />
      ))}
    </div>
  );
};

export default MansoryForExplore;
