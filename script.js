
// console.log(Redux);


// const Wirthdraw_mAny  =  "Wirthdraw-mAny";

// const Desponsite_mAny  =   "Desponsite-mAny";
// const Addproduct  =   "ADD-PRODUCT";

// const wirthdraw = (amount) => {
//     return {
//         type:  Wirthdraw_mAny,
//         payload:amount
//     }
// }


// const deposite = function (amount) {
//     return {
//         type: Desponsite_mAny ,
//         payload:amount
//     }
// }

// const Addpro = function (product) {
//     return {
//         type: Addproduct ,
//         payload:product
//     }
// }


// const bankreducer = (state = 1000 , action ) => {
//     switch (action.type) {
//         case  Wirthdraw_mAny:
//             return state - action.payload;
//         case Desponsite_mAny:
//             return state + action.payload;  
//         default:
//             return state;
//     }

// }


// const productreducer = (state = [] , action ) => {
//     switch (action.type) {
//         case Addproduct:
//             return [...state, action.payload] ;
//         default:
//             return state;
//     }

// }




// const compine = Redux.combineReducers({
//     bank:bankreducer,
//     products:productreducer



// })

// // const store = Redux.createStore(bankreducer);
// const store = Redux.createStore(compine);



// store.dispatch(Addpro({id:1, title:'product_1'}));



// store.dispatch(wirthdraw(100));
// store.dispatch(wirthdraw(200));
// store.dispatch(deposite(2000));

// console.log(store.getState());


// store.subscribe(()=>{
//     console.log( "current value " , store.getState());
// })

////////////////////////////////////////////////////////////////ststic //////////////////////


console.log(Redux);
console.log(ReduxThunk);


const Wirthdraw_mAny  =  "Wirthdraw-mAny";

const Desponsite_mAny  =   "Desponsite-mAny";
const Addproduct  =   "ADD-PRODUCT";
const Getproduct = "Getproduct";


const wirthdraw = (amount) => {
    return {
        type:  Wirthdraw_mAny,
        payload:amount
    }
}


const deposite = function (amount) {
    return {
        type: Desponsite_mAny ,
        payload:amount
    }
}

const Addpro = function (product) {
    return {
        type: Addproduct ,
        payload:product
    }
}


const fetchpro = (products) => {
    return{
        type: Getproduct ,
        payload:products
    }
}



const getproduct = () => {

    return async (dispatch) =>  {
        const res =await fetch('https://fakestoreapi.com/products');
        const data =  await res.json();
        console.log(data);
        dispatch(fetchpro(data))
    }

} 

const bankreducer = (state = 1000 , action ) => {
    switch (action.type) {
        case  Wirthdraw_mAny:
            return state - action.payload;
        case Desponsite_mAny:
            return state + action.payload;  
        default:
            return state;
    }

}




const productreducer = (state = [] , action ) => {
    switch (action.type) {
        case Getproduct:
            return [...action.payload] ;
        default:
            return state;
    }

}




const compine = Redux.combineReducers({
    bank:bankreducer,
    products:productreducer



})

// const store = Redux.createStore(bankreducer);
const store = Redux.createStore(compine , Redux.applyMiddleware(ReduxThunk));



store.dispatch(Addpro({id:1, title:'product_1'}));



store.dispatch(wirthdraw(100));
store.dispatch(wirthdraw(200));
store.dispatch(deposite(2000));

console.log(store.getState());

store.dispatch(getproduct());



store.subscribe(()=>{
    console.log( "current value " , store.getState());
})



let amountinput  = document.querySelector("#amount");
let amountvalue  = document.querySelector("#value");
amountvalue.innerHTML = store.getState().bank;
document.querySelector("#Wirthdraw").addEventListener('click' , () =>{
    store.dispatch(wirthdraw(+amountinput.value));
})
document.querySelector("#Desponsite").addEventListener('click' , () =>{
    store.dispatch(deposite(+amountinput.value));
})


store.subscribe(()=>{
    console.log( "current value " , store.getState());
    amountvalue.innerHTML = store.getState().bank;

})


