const express = require("express");
const path = require("path")
const PythonShell = require('python-shell').PythonShell;

const PORT = process.env.PORT || 3003;

const app = express();


app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api/predict", async (req, res) => {
  var options = {
    mode: 'text',
    pythonPath: 'python3',
    pythonOptions: ['-u'],
    scriptPath: './server/',
    args: [req.query.homeTeam, req.query.awayTeam]
  };

  PythonShell.run('inference.py', options, function (err, results) {
    if (err) 
      throw err;
    console.log(results);
    res.json({ results: results });
  });
});

app.get("/api/games", async (req, res) => {
  var options = {
    mode: 'text',
    pythonPath: 'python3',
    pythonOptions: ['-u'],
    scriptPath: './server/',
    args: []
  };

  PythonShell.run('dailyGames.py', options, function (err, results) {
    if (err) 
      throw err;
    console.log(results);
    res.json(results);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});