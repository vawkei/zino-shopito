
import MainFooter from "./main-footer/MainFooter"
import MainNavigation from "./main-navigation/MainNavigation";

const Layout = (props) => {
    return ( 
        <div>
            <MainNavigation />
            <main>{props.children}</main>
            <MainFooter />
        </div>
     );
}
 
export default Layout;