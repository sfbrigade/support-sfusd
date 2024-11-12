// Array.from(document.querySelectorAll("a")).map((anch) => { return {url: anch.getAttribute("href"), text: anch.textContent } })
// document.querySelector(".ytp-title-link").getAttribute("href");
// Array.from(document.querySelectorAll("a")).map((anch) => { return {url: anch.getAttribute("href"), text: anch.textContent } }).filter(({url}) => url ? url.startsWith("http") : false)

// good query to pull the text of the school description from the "more about this school" page
// document.querySelector(".section-school-tabs_content").textContent

// #block-sfusd-base-content > article > div > div.section-school-tabs.is-section-aligned-- > div > div.section-school-tabs_grid > div.section-school-tabs_content > div

/// ** best yet!
// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const response = await openai.chat.completions.create({
//   model: "gpt-4o",
//   messages: [
//     {
//       "role": "system",
//       "content": [
//         {
//           "type": "text",
//           "text": "You are a marketing expert helping the user construct a compelling description of a school based on text input extracted from a webpage. The overview should be a one or two sentence overview of the school. Create 3-5 bullet points of the most compelling aspects of the school. Extract the programs described in the text creating a name and description for each. Return the result as a JSON object based on the provided schema."
//         }
//       ]
//     }
//   ],
//   temperature: 1,
//   max_tokens: 2048,
//   top_p: 1,
//   frequency_penalty: 0,
//   presence_penalty: 0,
//   response_format: {
//     "type": "json_schema",
//     "json_schema": {
//       "name": "schema_overview",
//       "strict": true,
//       "schema": {
//         "type": "object",
//         "properties": {
//           "overview": {
//             "type": "string",
//             "description": "A compelling overview of the school expressed in one or two sentences."
//           },
//           "bullets": {
//             "type": "array",
//             "description": "A list of the most compelling aspects of the school summarized in bullet points.",
//             "items": {
//               "type": "string"
//             }
//           },
//           "programs": {
//             "type": "array",
//             "description": "A list of available programs.",
//             "items": {
//               "type": "object",
//               "properties": {
//                 "name": {
//                   "type": "string",
//                   "description": "The name of the program."
//                 },
//                 "description": {
//                   "type": "string",
//                   "description": "A detailed description of the program."
//                 }
//               },
//               "required": [
//                 "name",
//                 "description"
//               ],
//               "additionalProperties": false
//             }
//           }
//         },
//         "required": [
//           "overview",
//           "bullets",
//           "programs"
//         ],
//         "additionalProperties": false
//       }
//     }
//   },
// });
