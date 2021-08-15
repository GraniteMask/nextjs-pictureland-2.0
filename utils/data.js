import bcrypt from 'bcryptjs'

const data ={
    users: [
        {
            name: 'test',
            email: 'test@test.com',
            password: bcrypt.hashSync('test'),
            isAdmin: true,
        },   
        {
            name: 'test2',
            email: 'test2@test2.com',
            password: bcrypt.hashSync('test2'),
            isAdmin: false,
        },   
    ],
    products:[
        {
            name: 'Wallpaper 1',
            slug: 'Wallpaper1',
            category: 'Abstract',
            image: '/images/sample.jpg',
            isFeatured: true,
            featuredImage: '/images/sample.jpg',
            price: 100,
            brand: 'Free',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular wallpaper',
        },
        {
            name: 'Wallpaper 2',
            slug: 'Wallpaper2',
            category: 'Abstract',
            image: '/images/sample.jpg',
            isFeatured: true,
            featuredImage: '/images/sample.jpg',
            price: 100,
            brand: 'Free',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt',
        },
        {
            name: 'Wallpaper 3',
            slug: 'Wallpaper3',
            category: 'Abstract',
            image: '/images/sample.jpg',
            price: 100,
            brand: 'Free',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt',
        },
    ],
};

export default data