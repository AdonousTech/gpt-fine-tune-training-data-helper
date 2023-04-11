# JSON to JSONL Converter with Word Document Support

This utility is a Node.js script that converts JSON data to JSONL (JSON Lines) format. It also reads completion text from Microsoft Word documents and includes it in the final JSONL output.

## Features

- Converts JSON data to JSONL format
- Reads completion text from Word documents
- Handles newline characters in JSONL

## Installation

1. Install [Node.js](https://nodejs.org/en/) on your computer.

2. Clone this repository or download the source code.

3. Open a terminal or command prompt, navigate to the directory containing the source code, and run:

```bash
npm install
```

This command installs the required dependencies: fs, mammoth.

## Usage

1. Prepare an input javascript file containing an array of objects. Each object should have the following structure:

```json
module.exports = [{
  "prompt": {
    "question": "What is the capital?",
    "additionalInfo": "This city serves as the state's administrative center."
  },
  "wordFile": "completion1.docx"
}]
```
2. Save the input.js file in the same directory as the script and name it input.js.
3. Update the inputJson variable in the script to require the input.js file:

```javascript
const inputJson = require("./input");
```

4. Run the script

```bash
node index.js
```

The script will generate a JSONL file named `output.jsonl` in the same directory.

## Example

Suppose you have the following JSON input data in a file named `input.js`:

```javascript
module.exports = [
  {
    "prompt": {
      "question": "What is the capital?",
      "additionalInfo": "This city serves as the state's administrative center."
    },
    "wordFile": "completion1.docx"
  },
  {
    "prompt": {
      "question": "What is the state flower?",
      "additionalInfo": "This flower is native to the Pacific Northwest."
    },
    "wordFile": "completion2.docx"
  }
]
```

And you have two Word documents (`completion1.docx` and `completion2.docx`) containing the completion text.

When you run the script, it will generate a JSONL file (`output.jsonl`) with the following content:

```json
{"prompt":"{\"question\":\"What is the capital?\",\"additionalInfo\":\"This city serves as the state's administrative center.\"}\nAnswer:","completion":" The capital of Washington State is Olympia."}
{"prompt":"{\"question\":\"What is the state flower?\",\"additionalInfo\":\"This flower is native to the Pacific Northwest.\"}\nAnswer:","completion":" The state flower of Washington is the Coast Rhododendron."}
```











