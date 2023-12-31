import "./Home.scss";
import Slider from "../slider/Slider";
import HomeInfobox from "./HomeInfobox";
import { productData } from "../carousel/Data";
import CarouselItem from "../carousel/CarouselItem";
import ProductCarousel from "../carousel/ProductCarousel";
import ProductCategory from "./ProductCategory";
import FooterLinks from "../layout/main-footer/FooterLinks";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../store/products/productIndex";

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

  const dispatch =  useDispatch()
  
  useEffect(()=>{
   dispatch(getProducts())
  },[dispatch]);

  const {products} = useSelector((state)=>state.product);

  const latest = products
  ?.filter((product)=>{
    return product.quantity > 0 
  })
  ?.filter((product,index)=>{
    return index < 7
  })


  const phones = products
  ?.filter((product)=>{
    return product.quantity > 0 
  })
  ?.filter((product)=>{
    return product.category=== "Phone"
  })
  ?.filter((product,index)=>{
    return index < 7
  })



  const latestProducts = latest.map((item, index) => {
    return (
      <div key={index}>
        <CarouselItem
          name={item.name}
          url={item.image[0]}
          price={item.price}
          regularPrice={item.regularPrice}
          description={item.description}
          product={item}
        />
      </div>
    );
  });
  const phonesProducts = phones.map((item, index) => {
    return (
      <div key={index}>
        <CarouselItem
          name={item.name}
          url={item.image[0]}
          price={item.price}
          regularPrice={item.regularPrice}
          description={item.description}
          product={item}
        />
      </div>
    );
  });

  // const productx = productData.map((item, index) => {
  //   return (
  //     <div key={index}>
  //       <CarouselItem
  //         name={item.name}
  //         url={item.imageurl}
  //         price={item.price}
  //         description={item.description}
  //       />
  //     </div>
  //   );
  // });
  

  return (
    <div>
      <h1>Home Page</h1>
      <Slider />
      <section>
        <div className="container">
          <HomeInfobox />
          <PageHeading heading={"Latest Products"} btnText={"Shop Now >>>"} />
          <ProductCarousel products={latestProducts} />
        </div>
      </section>
      <section className="--bg-grey">
        <div className="container">
          <h3>Categories</h3>
          <ProductCategory />
        </div>
      </section>

      <section>
        <div className="container">
          <PageHeading heading={"Mobile-Phones"} btnText={"Shop Now >>>"} />
          <ProductCarousel products={phonesProducts} />
        </div>
      </section>
      <FooterLinks />
    </div>
  );
};

export default Home;



//THE ONE BELOW IS A DUMMY VERSION, BEFORE WE CONFIGURED AND ADDED THE REAL/ACTUAL DATA TO OUR MONGODB:

// import "./Home.scss";
// import Slider from "../slider/Slider";
// import HomeInfobox from "./HomeInfobox";
// import { productData } from "../carousel/Data";
// import CarouselItem from "../carousel/CarouselItem";
// import ProductCarousel from "../carousel/ProductCarousel";
// import ProductCategory from "./ProductCategory";
// import FooterLinks from "../layout/main-footer/FooterLinks";

// const PageHeading = (props) => {
//   return (
//     <>
//       <div className="--flex-between">
//         <h2 className="--fw-thin">{props.heading}</h2>
//         <button className="--btn">{props.btnText}</button>
//         <div className="--hr"></div>
//       </div>
//     </>
//   );
// };


// const productx = productData.map((item, index) => {
//   return (
//     <div key={index}>
//       <CarouselItem
//         name={item.name}
//         url={item.imageurl}
//         price={item.price}
//         description={item.description}
//       />
//     </div>
//   );
// });


// const Home = () => {
//   return (
//     <div>
//       <h1>Home Page</h1>
//       <Slider />
//       <section>
//         <div className="container">
//           <HomeInfobox />
//           <PageHeading heading={"Latest Products"} btnText={"Shop Now >>>"} />
//           <ProductCarousel products={productx} />
//         </div>
//       </section>
//       <section className="--bg-grey">
//         <div className="container">
//           <h3>Categories</h3>
//           <ProductCategory />
//         </div>
//       </section>

//       <section>
//         <div className="container">
//           <PageHeading heading={"Mobile-Phones"} btnText={"Shop Now >>>"} />
//           <ProductCarousel products={productx} />
//         </div>
//       </section>
//       <FooterLinks />
//     </div>
//   );
// };

// export default Home;
