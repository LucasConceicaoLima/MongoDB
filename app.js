import { MongoClient } from 'mongodb';
import fs from 'fs';

const myDB = {
    server: '127.0.0.1',
    port: 27017,
}

const uri = `mongodb://${myDB.server}:${myDB.port}`;
const client = new MongoClient(uri);

const newProduct = {
    id_prod: 301,
    nome: 'ECHO DOT ALEXA 2.0',
    descricao: 'AMAZON ALEX ECHO DOT 3 GEN SMART SPEAKER',
    preco: 500,
    importado: false,
    qtd_estoque: 1000
};

const database = client.db('shop'); 
const collection = database.collection('produtos_fire');

const data = fs.readFileSync('task02.json', 'utf8');
const products = JSON.parse(data);

const projection = { _id: 0, descricao: 0 };
const sortOptions = { desconto: -1 };
const filterOptions = {
    desconto: { $exists: true }
  };


try {
    await client.connect();
    if (client.db('admin').command({ "ping": 1 })) {
        console.log("Conectado!");
        //Exerc 1
        //const result = await collection.insertOne(newProduct);
        //console.log(`Inserted product with ID: ${result.insertedId}`);

        //Exerc 2
        //const result = await collection.insertMany(products);
        //console.log(`Inserted ${result.insertedCount} products`);

        //Exerc 3-4
        const index = collection.find(filterOptions, { projection }).sort(sortOptions);
        
        await index.forEach(document => {
          console.log(document);
        });
    } else {
        throw Error("Erro ao conectar ao banco.");
    }
} catch (error) {
    console.error(error);
}
finally {
    await client.close()
    process.exit(0)
}