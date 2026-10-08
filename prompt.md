# Project Prompts Log

This document records all user prompts provided during the development of **The News Dispatch** (`news_stand_for_all`) in chronological order.

---

## Prompt 1: Initial App Build & Architectural Specification
```text
Build a news app using
1. reference on Miro board file on attached pdf
2. read the md file attached on https://github.com/angliangsheng-hub/news_stand_for_all for API documentation and layout integration.
```

### Key Requirements Implemented:
- Cross-border aggregators with interactive selection (Google News RSS, Reuters, BBC, Straits Times, CNA, China Digital Times, Agent News, Noozra).
- Uizard "the news dispatch." editorial layout:
  - Masthead & categories (*LATEST, WORLD, SPORTS, CULTURE, WELLNESS, ECONOMY*).
  - Left column: AI Podcast summary (*"Daily Minute: Reports from around the world"* with NotebookLM-style audio readout) & "Connect the Dots" emerging themes clusters.
  - Center column: Lead story hero (*"Best summer reads for your vacation"*), sports highlight, Singapore/Asia regional spotlight, and continuous wire feed.
  - Right column: Singapore meteorological weather synopsis (Marina Bay, Orchard, Changi, Jurong), search memory, related dispatches, and China Digital Times (CDT) censorship sensor.
- MCP Health monitor (`/api/health`) with green (OK) / amber status badge.
- Animated Singapore Merlion Mascot interactive live assistant.
- "Singapore vs The World" dual-lens perspective analysis.
- Broadsheet styling with Newsreader serif and Plus Jakarta Sans typography.

---

## Prompt 2: GitHub Repository Push
```text
git push https://<GITHUB_TOKEN>@github.com/angliangsheng-hub/news_stand_for_all
```

### Key Requirements Implemented:
- Initialized git repository, rebased with remote `main` branch preserving `RGOGC_master_prompt_influencer.md`.
- Added standalone serverless handlers at `api/health.js` and `api/news.js` for Vercel deployment compatibility.
- Committed full codebase and pushed to remote GitHub repository.

---

## Prompt 3: Subscriber Removal & Mascot Renaming to Prof M
```text
1. remove subscriber
2. name merlion as Prof M
```

### Key Requirements Implemented:
- **Remove subscriber**:
  - Removed "Subscribe" button from top navigation header and masthead.
  - Removed subscription plans modal and pricing tier components.
- **Name Merlion as Prof M**:
  - Renamed the animated mascot assistant to **Prof M** (AI News Scholar · SG).
  - Updated floating trigger badge tooltip to *"Ask Prof M · [temp]°C SG"*.
  - Updated live chat panel header, welcome message, and top startup prompt suggestions to Prof M.
  - Updated audio podcast co-host credits to *"Nicole Schulz & Prof M"*.
  - Updated Gemini system instructions, assistant persona, reader profile sync, and HTML/applet metadata.

---

## Prompt 4: Deepavali & Singapore Festive Period Banner
```text
3. include my deepavali/depending whether there is any festive period in singapore banner
```

### Key Requirements Implemented:
- **Automatic Festive Season Detection**:
  - Server detects October–November as the active Singapore **Deepavali (Festival of Lights)** season (Little India street light-up and festive bazaar along Serangoon Road).
  - Calculates countdown days and identifies the gazetted holiday (Sunday, 8 November 2026, with Monday 9 November public holiday in-lieu for a 3-day long weekend).
- **Prominent Festive Banner**:
  - Radiant saffron-amber and warm garnet gradient with diya lamp (🪔) emblem and festive greetings (*"Happy Deepavali · Shubh Diwali (दीपावली)"*).
  - Cultural highlights for Little India celebrations and 1-click **"Explore Festive Stories"** button.
- **Dynamic Festive Mood Selector**:
  - Interactive switcher supporting all Singapore festive seasons:
    - 🪔 **Deepavali** (Festival of Lights)
    - 🏮 **Chinese New Year** (Year of the Horse · Chinatown & River Hongbao)
    - 🌙 **Hari Raya Aidilfitri** (Geylang Serai Bazaar & Kampong Glam)
    - 🇸🇬 **Singapore National Day** (NDP at the Padang & State Flypast)
    - 🎄 **Christmas** (Christmas on A Great Street along Orchard Road)
    - **Standard Broadsheet** (Clean editorial mode)
- Added standalone `api/weather.js` serverless handler for Vercel deployment.

---

## Prompt 5: Prompt Log Documentation
```text
create a prompt.md containing all my prompts located at project.main
```

### Key Requirements Implemented:
- Created `/prompt.md` containing all prompts, chronological history, and implementation summaries.
