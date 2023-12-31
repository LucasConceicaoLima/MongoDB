import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
const myDB = {
    server: '127.0.0.1',
    port: 27017,
};

const uri = `mongodb://${myDB.server}:${myDB.port}`;
const client = new MongoClient(uri);

let currentIdFlashcards;
let currentIdLicao;
let currentIdEscola;

app.use(express.json());

async function connectDB() {
    try {
        await client.connect();
        if (client.db('admin').command({ "ping": 1 }))  {
            console.log("Connected!");

            const db = client.db('TCC');
            const flashcardsCount = await db.collection('flashcards').countDocuments();
            currentIdFlashcards = flashcardsCount + 1;
            const licaoCount = await db.collection('licao').countDocuments();
            currentIdLicao = licaoCount + 1;
            const escolaCount = await db.collection('escolas').countDocuments();
            currentIdEscola = escolaCount + 1;

            return db;
        } else {
            throw Error("Failed to connect to the database.");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Get flashcards
app.get('/flashcards', async (req, res) => {
    try {
        const db = await connectDB();
        const flashcards = await db.collection('flashcards').find().toArray();
        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get flashcard 
app.get('/flashcards/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const { id } = req.params;

        const intId = parseInt(id);

        const flashcard = await db.collection('flashcards').findOne({ _id: intId });
        
        if (flashcard) {
            res.json(flashcard);
        } else {
            throw new Error(`Flashcard com id ${id} não encontrado!`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Insert flashcard
app.post('/flashcards', async (req, res) => {
    try {
        const db = await connectDB();
        currentIdFlashcards++;

        // Validate if both fields are present and contain at least one non-space character
        const frente = req.body.frente.trim();
        const verso = req.body.verso.trim();

        if (!frente || !verso || /^\s*$/.test(frente) || /^\s*$/.test(verso)) {
            throw new Error('Frente e verso são campos obrigatórios e devem conter pelo menos um caractere que não seja espaço.');
        }

        const newFlashcard = {
            _id: currentIdFlashcards,
            frente,
            verso,
        };

        const result = await db.collection('flashcards').insertOne(newFlashcard);
        if (result) {
            res.json({ message: 'Flashcard criado com sucesso!', flashcard: newFlashcard });
        } else {
            throw new Error('Erro ao criar flashcard!');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update flashcard
app.put('/flashcards/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const { id } = req.params;

        const intId = parseInt(id);

        const result = await db.collection('flashcards').updateOne(
            { _id: intId },
            { $set: req.body }
        );

        if (result.matchedCount > 0) {
            res.json({ message: `Flashcard com id ${id} atualizado!` });
        } else {
            throw new Error(`Flashcard com id ${id} não encontrado!`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete flashcard
app.delete('/flashcards/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const { id } = req.params;

        const intId = parseInt(id);

        const result = await db.collection('flashcards').deleteOne({ _id: intId });
        if (result.deletedCount === 1) {
            res.json({ message: `Flashcard com id ${id} removido!` });
        } else {
            throw new Error(`Flashcard com id ${id} não encontrado.`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get licoes
app.get('/licoes', async (req, res) => {
    try {
        const db = await connectDB();
        const licoes = await db.collection('licao').find().toArray();
        res.json(licoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get licao
app.get('/licoes/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const { id } = req.params;

        // Convert the ID to an integer
        const intId = parseInt(id);

        const licao = await db.collection('licao').findOne({ _id: intId });
        
        if (licao) {
            res.json(licao);
        } else {
            throw new Error(`Lição com id ${id} não encontrada!`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Insert licao
app.post('/licoes', async (req, res) => {
    try {
        const db = await connectDB();
        currentIdLicao++; // começa em 0

        const conteudo = req.body.conteudo.trim();
        const descricao = req.body.descricao.trim();
        const nivel = req.body.nivel.trim();
        const titulo = req.body.titulo.trim();
        const frequencia = req.body.frequencia.trim();

        if (!conteudo || !descricao || !nivel || !titulo || !frequencia ||
            /^\s*$/.test(conteudo) || /^\s*$/.test(descricao) || /^\s*$/.test(nivel) ||
            /^\s*$/.test(titulo) || /^\s*$/.test(frequencia)) {
            throw new Error('Todos os campos (conteudo, descricao, nivel, titulo, frequencia) são obrigatórios e devem conter pelo menos um caractere que não seja espaço.');
        }

        const newLicao = {
            _id: currentIdLicao,
            conteudo,
            descricao,
            nivel,
            titulo,
            frequencia
        };

        const result = await db.collection('licao').insertOne(newLicao);
        if (result) {
            res.json({ message: 'Lição criada com sucesso!', licao: newLicao });
        } else {
            throw new Error('Erro ao criar lição!');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Update licao
app.put('/licoes/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const { id } = req.params;

        const intId = parseInt(id);

        const result = await db.collection('licao').updateOne(
            { _id: intId },
            { $set: req.body }
        );

        if (result.matchedCount > 0) {
            res.json({ message: `Lição com id ${id} atualizada!` });
        } else {
            throw new Error(`Lição com id ${id} não encontrada!`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete licao
app.delete('/licoes/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const { id } = req.params;

        const intId = parseInt(id);

        const result = await db.collection('licao').deleteOne({ _id: intId });
        if (result.deletedCount === 1) {
            res.json({ message: `Lição com id ${id} removida!` });
        } else {
            throw new Error(`Lição com id ${id} não encontrada.`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get escolas
app.get('/escolas', async (req, res) => {
    try {
        const db = await connectDB();
        const escolas = await db.collection('escolas').find().toArray();
        res.json(escolas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get escola
app.get('/escolas/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const { id } = req.params;

        // Convert the ID to an integer
        const intId = parseInt(id);

        const escola = await db.collection('escolas').findOne({ _id: intId });
        
        if (escola) {
            res.json(escola);
        } else {
            throw new Error(`Escola com id ${id} não encontrada!`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Insert escola
app.post('/escolas', async (req, res) => {
    try {
        const db = await connectDB();
        currentIdEscola++; // começa em 0

        const cidade = req.body.cidade.trim();
        const endereco = req.body.endereco.trim();
        const estado = req.body.estado.trim();
        const nome = req.body.nome.trim();
        const numero = req.body.numero.trim();
        const presencial = req.body.presencial.trim();

        if (!cidade || !endereco || !estado || !nome || !numero || !presencial ||
            /^\s*$/.test(cidade) || /^\s*$/.test(endereco) || /^\s*$/.test(estado) ||
            /^\s*$/.test(nome) || /^\s*$/.test(numero) || /^\s*$/.test(presencial)) {
            throw new Error('Os campos cidade, endereco, estado, nome, numero e presencial são obrigatórios e devem conter pelo menos um caractere que não seja espaço.');
        }

        const newEscola = {
            _id: currentIdEscola,
            cidade,
            endereco,
            estado,
            nome,
            numero,
            presencial,
            facebook: req.body.facebook || null, 
            instagram: req.body.instagram || null,
            complemento: req.body.complemento || null
        };

        const result = await db.collection('escolas').insertOne(newEscola);
        if (result) {
            res.json({ message: 'Escola criada com sucesso!', escola: newEscola });
        } else {
            throw new Error('Erro ao criar escola!');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Update escola
app.put('/escolas/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const { id } = req.params;

        const intId = parseInt(id);

        const result = await db.collection('escolas').updateOne(
            { _id: intId },
            { $set: req.body }
        );

        if (result.matchedCount > 0) {
            res.json({ message: `Escola com id ${id} atualizada!` });
        } else {
            throw new Error(`Escola com id ${id} não encontrada!`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete escola
app.delete('/escolas/:id', async (req, res) => {
    try {
        const db = await connectDB();
        const { id } = req.params;

        const intId = parseInt(id);

        const result = await db.collection('escolas').deleteOne({ _id: intId });
        if (result.deletedCount === 1) {
            res.json({ message: `Escola com id ${id} removida!` });
        } else {
            throw new Error(`Escola com id ${id} não encontrada.`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get escolas por nome da cidade
app.get('/escolas_cidade', async (req, res) => {
    try {
        const { cidade } = req.body;
        const db = await connectDB();
        
        const escolas = await db.collection('escolas').find({ cidade }).toArray();
        
        res.json(escolas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get licao por maior ordem de frequencia de utilização
app.get('/licao-mais-frequente', async (req, res) => {
    try {
        const db = await connectDB();
        
        const licaoMaisFrequente = await db.collection('licao')
            .find()
            .sort({ frequencia: -1 })
            .limit(1)
            .toArray();

        res.json(licaoMaisFrequente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get licao por menor ordem de frequencia de utilização
app.get('/licao-menos-frequente', async (req, res) => {
    try {
        const db = await connectDB();
        
        const licaoMenosFrequente = await db.collection('licao')
            .find()
            .sort({ frequencia: 1 })
            .limit(1)
            .toArray();

        res.json(licaoMenosFrequente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get licoes dentro do intervalo
app.get('/licoes-frequencia/', async (req, res) => {
    try {
        const db = await connectDB();
        const { min, max } = req.body;

        // Convert the min and max to integers
        const intMin = parseInt(min);
        const intMax = parseInt(max);

        if (intMin !== NaN && intMax !== NaN) {
            const licoes = await db.collection('licao')
                .find({ frequencia: { $gte: intMin, $lte: intMax } })
                .toArray();

            if (licoes.length > 0) {
                res.json(licoes);
            } else {
                throw new Error(`Nenhuma lição encontrada na frequência entre ${min} e ${max}!`);
            }
        } else {
            throw new Error('Os parâmetros min e max devem ser números válidos.');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
