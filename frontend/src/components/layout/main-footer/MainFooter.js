import classes from "./MainFooter.module.scss";

const MainFooter = () => {

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const date = new Date();
    let month = date.getMonth();
     month =   months[month];

    let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thur",
        "Fri",
        "Sat",
    ]
    let day = date.getDay();
    day =  days[day]

    let year = date.getFullYear()
    //console.log(`${day} ${date.getDate()} ${month}, ${year}`)
    const dateInFull = `${day} ${date.getDate()} ${month}, ${year}`
    return ( 
        <div className={classes.footer}>
            <p style={{color:"white"}}>&copy; {dateInFull} All Rights Reserved</p>
        </div>
     );
}
 
export default MainFooter;