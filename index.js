'use strict';

const fs = require('fs');
const mammoth = require('mammoth');

// Read completion text from a Word document file
async function readCompletionText(wordFile) {
    const result = await mammoth.extractRawText({path: wordFile});
    return result.value.trim();
}

// Utility function to convert JSON to JSONL
async function jsonToJSONL(inputJSON) {
    const jsonData = inputJSON;
    let jsonl = '';
  
    for (const item of jsonData) {
      // Convert prompt JSON object to a JSON string
      let prompt = JSON.stringify(item.prompt);
      // Ensure prompt string is legal JSONL syntax
      prompt = prompt.replace(/(?:\r\n|\r|\n)/g, '\\n');
  
      const completionText = await readCompletionText(item.wordFile);
      let completion = completionText.replace(/(?:\r\n|\r|\n)/g, '\\n');
  
      // Create JSONL line
      // Add any static text that will always be included in prompts during inference calls before ${prompt} if necessary
      let jsonlLine = {
        prompt: `${prompt}\nAnswer:`,
        completion: ` ${completion}`
      };
  
      // Append JSONL line to output
      jsonl += JSON.stringify(jsonlLine) + '\n';
    }
  
    return jsonl;
}

// canonical input file for fine-tune prompts
const inputJson = require("./input");


(async () => {
    const jsonlData = await jsonToJSONL(inputJson);
    console.log(jsonlData);
  
    // To save the JSONL data to a file
    fs.writeFileSync('output.jsonl', jsonlData);
})();