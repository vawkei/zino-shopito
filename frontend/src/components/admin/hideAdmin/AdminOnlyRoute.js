import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminOnlyRoute = (props) => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  if (user?.role === "admin" && user?.name === "admin") {
    return props.children;
  }

  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Permission Denied</h2>
        <p>Admins Only</p>
        <br />
        <Link to={"/"}>
          <button className="--btn"> Back To Home</button>
        </Link>
      </div>
    </section>
  );
};


export const AdminOnlyLink = (props) => {
    const { user } = useSelector((state) => state.auth);

    if (user && user.name === "admin" && user.role === "admin") {
        return props.children;
    } else {
        return null;
    }
}


export default AdminOnlyRoute;

//note: 
//  number1: 
//if (user && user.name === "admin" && user.role === "admin") {
//     return props.children;
// }
// number 2:
// if (user?.name === "admin" && user?.role === "admin") {
//     return props.children;
//   } they both do the same thing in different ways.

// Number 1: the condition checks if user exists (user is truthy) before accessing the name and role properties. If user is falsy (e.g., null or undefined), the subsequent checks (user.name === "admin" and user.role === "admin") won't be evaluated, preventing potential errors.

// Number 2: Here, the optional chaining operator (?.) is used to handle potential null or undefined values. If user is falsy, the entire expression evaluates to undefined, and the subsequent property checks (user?.name and user?.role) will not throw an error. This helps in cases where user might be null or undefined.

