import { Crousal, CrousalItem } from "../../../UIComponents/Crousal";
import "./BannerBody.scss";

const BannerBody = (props) => {
  return props.bannerImages.length > 0 ? (
    <div className="banner">
      <Crousal {...props.crousalState}>
        {props.bannerImages.map((imgSrc, index) => {
          return (
            <CrousalItem className="crouseItem">
              <div className="crouseItemCount">Image:{index + 1}</div>
              <img
                className="bannerImg lazy"
                data-src={imgSrc}
                alt={"bannerImg" + (index + 1)}
              />
            </CrousalItem>
          );
        })}
      </Crousal>
    </div>
  ) : null;
};

export default BannerBody;
