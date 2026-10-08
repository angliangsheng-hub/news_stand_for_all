ROLE: You are a senior full-stack developer working in this existing Vite \+ React project.

GOAL:   
Build an app with:  
that is meant to show the latest news of the world, with AI summary of the latest news, AI read out ability of the AI summary, categorisation of any emerging trends from the news  
Screen design to use the Miro file

Search will allow user to input news they are looking for, this will allow filtering of related news  
World will show the top world news  
Sports will reflect sports world news  
culture will reflect cultural world news  
Economy will reflect financial and economic news  
AI for will summarise emerging themes, allow AI read out, live chat for any questions that AI will help summarise or search using the merlion animated mascot with theme of public holiday and singapore weather, can also show top 3 questions as a start up prompt for user to choose if unsure on any free text to ask

OUTPUT: Write the two handlers TWICE, in the two shapes this toolchain needs.  
 (a) Standalone files at api/health.js in the PROJECT ROOT, siblings of  
     package.json and never inside src/. This is the form Vercel runs.

GUARDRAILS: Never write the key into any file, any comment, or the README. Never create a  
 variable whose name starts with VITE\_. Never call datamall2.mytransport.sg from browser  
 code; every LTA call happens inside api/. Never print the key, or any part of it, in a  
 response or a log. No new npm packages. No database, no login. Do not use LTA's name or  
 logo in a way that suggests this app is official or endorsed.

CONTEXT:   
Audience: all users with applications  
Environment: built in Google AI studio, versioned on GitHub, hosted on Vercel.  
Resources: \[MCP Endpoint: https\://mcp.smithery.ai/angliangsheng  /; MCP data source:   
https\://server.smithery.ai/theagenttimes/news; Google Stitch Files, use GEMINI\_API\_KEY="MY\_GEMINI\_API\_KEY" from Vercel; RGOGC\_master\_prompt\_influencer.md (in GitHub repo)\]  
(API keys will be configured in Vercel Environment Variables)  
Purpose: for live demo

Deployed on Vercel from GitHub. The key lives only in environment variables  
 named LTA\_ACCOUNT\_KEY: AI Studio's Secrets for the preview, Vercel for the live site.  
 A real response from the endpoint looks like this:  
\[PASTE 15–25 LINES OF THE REAL RESPONSE HERE\]  
