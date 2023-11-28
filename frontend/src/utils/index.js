
export const shortenText = (text,n)=>{
    if(text.length > n){
        const shortenedText = text.substring(0,n).concat("...");
        return shortenedText;
    }
    return text
};


//Validate email:

export const validateEmail =(email)=>{
    return  email.match ( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
} ;

//calculate star ratings:

export function calculateAverageRatings(ratings){
    if(!Array.isArray("ratings") || ratings.length===0){
        return 0 //Return 0 if the ratings array is empty or not an array
    }
    var totalStars = 0;
    for(let i=0; i < ratings.length; i++ ){
        var rating = ratings[i];
        if(rating.hasOwnProperty("star")){
            totalStars +=rating.star
        }
    }
    return  totalStars/ratings.length
}


// export const getCartQuantityById = (product,id)=>{
//     for(let i = 0; i < product.length; i++){
//         if(product[i]._id ===id){
//             return product[i].cartQuantity;
//         }
//     }
//     return 0
// }
export const getCartQuantityById = (product, id) => {
    const foundProduct = product.find(item => item._id === id);
    return foundProduct ? foundProduct.cartQuantity : 0;
};

//EXTRACT ID AND CART QUANTITY FROM CARTITEMS:
export const extractIdAndCartQuantity = (cartItems)=>{
    return cartItems.map((item)=>{
     return {
        _id:item._id,
        cartQuantity:item.cartQuantity
     }  
    })
}