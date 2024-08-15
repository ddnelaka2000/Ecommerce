const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://nelakadave:6uUlFA3egk0Q9L8r@cluster0.gp7yr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const seedProducts = [
    {
        sku: "#CA25",
        name: "Sample Product 1",
        description: "This is a sample product.",
        price: 29.99,
        images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
        thumbnail: "https://example.com/image1.jpg"
    },
    {
        sku: "#CA34",
        name: "Sample Product 2",
        price: 29.99,
        description: "This is a sample product.",
        images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
        thumbnail: "https://example.com/image1.jpg"
    },
    {
        sku: "#CA35",
        name: "Sample Product 3",
        description: "This is a sample product.",
        price: 29.99,
        images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
        thumbnail: "https://example.com/image1.jpg"
    },
    {
        sku: "#CA56",
        name: "Sample Product 4",
        description: "This is a sample product.",
        price: 29.99,
        images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
        thumbnail: "https://example.com/image1.jpg"
    },
    {
        sku: "#CA57",
        name: "Sample Product 5",
        description: "This is a sample product.",
        price: 29.99,
        images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
        thumbnail: "https://example.com/image1.jpg"
    }
];

async function seedDB() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    
    const database = client.db("Portal");

   
    const productsCollection = database.collection('products');

    // Delete all existing documents in the collection
    await productsCollection.deleteMany({});

    
    await productsCollection.insertMany(seedProducts);

    console.log("Database seeded with products!");
  } catch (err) {
    console.error('Error seeding the database:', err);
  } finally {
    
    await client.close();
  }
}

seedDB().catch(console.dir);
