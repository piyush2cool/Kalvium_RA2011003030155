const express = require('express');
const math = require('mathjs');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const historyFilePath = path.join(__dirname, 'history.json');

app.use(express.urlencoded({ extended: true }));

const MapToOperator = {
    plus: '+',
    minus: '-',
    into: '*',
    divide: '/'
};

function loadHistoryFromFile() {
    try {
        const data = fs.readFileSync(historyFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveHistoryToFile(history) {
    try {
        fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2), 'utf8');
    } catch (error) {
        console.error('Error saving history:', error);
    }
}

function calculateOperation(operation) {
    try {
        const result = math.evaluate(operation);
        const history = loadHistoryFromFile();

        history.push({ question: operation, answer: result });

        if (history.length > 20) {
            history.shift();
        }

        saveHistoryToFile(history);

        return { question: operation, answer: result };
    } catch (error) {
        return { question: operation, answer: 'Invalid operation' };
    }
}

app.get('/', (req, res) => {
    const getEndpoints = [
        { endpoint: '/history', description: 'It lists the past 20 operations performed on this server and their answer.' },
        { endpoint: '/calculate', description: 'It performs a calculation. It uses query parameter "operation" for the operation in the format calculate?operation=5/plus/8' }
    ];

    res.json(getEndpoints);
});

app.get('/history', (req, res) => {
    const history = loadHistoryFromFile().slice(-20); 
    res.json(history);
});

app.get('/calculate', (req, res) => {
    const Parts = req.query.operation.split('/');
    if (Parts.length < 3 || Parts.length % 2 === 0) {
        return res.status(400).send('Invalid operation format.');
    }

    let operation = '';
    for (let i = 0; i < Parts.length; i++) {
        if (i % 2 === 0) {
            operation += parseFloat(Parts[i]);
        } else {
            const operator = MapToOperator[Parts[i]];
            if (!operator) {
                return res.status(400).send('Invalid operator input');
            }
            operation += operator;
        }
    }

    const result = calculateOperation(operation);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
