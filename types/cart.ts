export interface CartResponse {

    id:string;

    quantity:number;

    priceAtAddition:string;

    food:{

        id:string;

        name:string;

        image:string;

        price:string;

        description:string;

        isVeg:boolean;

        available:boolean;

        category:{

            id:string;

            name:string;

        };

    };

}