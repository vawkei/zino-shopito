import "./Home.scss";
import Slider from "../slider/Slider";
import HomeInfobox from "./HomeInfobox";

const PageHeading = (props) => {
  return (
    <>
      <div className="--flex-between">
        <h2 className="--fw-thin">{props.heading}</h2>
        <button className="--btn">{props.btnText}</button>
        <div className="--hr"></div>
      </div>
    </>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Slider />
      <section>
        <div className="container">
          <HomeInfobox />
          <PageHeading heading={"Latest Products"} btnText={"Shop Now >>>"} />
        </div>
      </section>
    </div>
  );
};

export default Home;
