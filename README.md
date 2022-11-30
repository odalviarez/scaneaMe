Las rutas son las siguientes:
GET http://localhost:5000/products
GET http://localhost:5000/products/:id
DELETE http://localhost:5000/products/:id

GET http://localhost:5000/user/:email

POST http://localhost:5000/products

body:
{
        "name": "Pantalon chupin",
        "color": "black",
        "type": "pants",
        "price": 150,
        "image": "https://res.cloudinary.com/dxfksb8ua/image/upload/v1666969305/cld-sample-5.jpg",
        "stock": [
        {
            "size": "xs",
            "quantity": 10
        },
        {
            "size": "s",
            "quantity": 5
        },
        {
            "size": "m",
            "quantity": 3
        },
        {
            "size": "l",
            "quantity": 12
        },
        {
            "size": "xl",
            "quantity": 0
        },
        {
            "size": "xxl",
            "quantity": 18
        }
    ]
}


PUT http://localhost:5000/products/:id



body:

{
    "name": "Pantalon chupin",
    "type": "pants",
    "stock": [
        {
            "size": "xs",
            "quantity": 5
        },
        {
            "size": "s",
            "quantity": 5
        },
        {
            "size": "m",
            "quantity": 3
        },
        {
            "size": "l",
            "quantity": 12
        },
        {
            "size": "xl",
            "quantity": 0
        },
        {
            "size": "xxl",
            "quantity": 18
        }
    ],
    "color": "black",
    "price": 150,
    "image": "https://res.cloudinary.com/dxfksb8ua/image/upload/v1666969305/cld-sample-5.jpg"
    }
