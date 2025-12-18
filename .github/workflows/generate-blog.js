import fs from "fs";
import path from "path";
import axios from "axios";

const blogDir = "./blog";
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir);
}

const today = new Date().toISOString().split("T")[0];
const filePath = path.join(blogDir, `${today}.md`);

const prompt = `
Write a high-quality SEO blog post (800–1000 words).

Topic: Business, technology, or e-commerce.

Requirements:
- SEO-friendly title
- Meta description
- Clear H2 and H3 headings
- Short, readable paragraphs
- Actionable tips
- Call to action at the end
`;

async function generateBlog() {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: process.env.OPENAI_MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    },
    {
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  fs.writeFileSync(filePath, response.data.choices[0].message.content);
  console.log("✅ Blog generated:", filePath);
}

generateBlog();
