import {Link} from "react-router-dom";

const NotFound = () => {
    return ( 
        <section style={{ height: "80vh" }}>
      <div className="--center-all">
        <h2>Page Not Found</h2>
        <p>Looks like the Page you are looking for couldn't be Found</p>
        <br />
        <Link to={"/"}>
          <button className="--btn"> Back To Home</button>
        </Link>
      </div>
    </section>
     );
}
 
export default NotFound;