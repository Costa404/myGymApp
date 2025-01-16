import MyData from "../../MyData";
import imgGym from "../../../assets/eb4cefe0c24c3e3010394ae4bfd3c9b8.jpg";

const ContentHomepage = () => {
  return (
    <div
      className="d-flex  w-100 h-100 position-relativeS contentHomepage"
      style={{ paddingLeft: "15%", paddingRight: "15%" }}
    >
      <img
        src={imgGym}
        alt=""
        className="position-absolute imgNotNatty"
        style={{ bottom: "0", left: "0", width: "20%" }}
      />
      <div className="d-flex flex-column  w-50 h-100 justify-content-end align-items-center mt-5 contentHomepageContainerBottom">
        <h1
          className="h-50 d-flex align-items-end "
          style={{ fontSize: "5rem" }}
        >
          Make progress towards a better you.
        </h1>
        <MyData />
      </div>
    </div>
  );
};

export default ContentHomepage;
