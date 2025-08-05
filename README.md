# agentic-ai-app 
# Architecture Diagram


+---------------------+                         +-----------------------+
|    React Frontend   |   ① File Upload (API)   |    Node.js/Express    |
|  (Docker Container) +-----------------------> |    Backend (MVC,      |
|                   //|                         |   Docker Container)   |
+---------------------+                         +-----------------------+
                                                |  - Multer Middleware  |
                                                |  - Controller Layer   |
                                                |  - Service Layer      |
                                                |     (calls Whisper)   |
                                                |  - Model Layer        |
                                                +----------+------------+
                                                           |
                                                           | ② Save transcript/read metadata
                                                           v
                                                +-----------------------+
                                                |      MongoDB          |
                                                |(Docker or Cloud-host) |
                                                +-----------------------+
                                                           ^
                                                           |
+-----------------------+        ③ System Call (CLI)       |
|    Whisper CLI/LLM    |<-------------------------+       |
| (Runs inside backend  |  <--- audio file path    |       |
|  container or mapped) |     (OS-level process)   |       |
+-----------------------+                         |       |
             |                                    |       |
         output .txt file ------------------------+-------+



# How to run the app


# 📦 How to Set Up and Run the Agentic AI App

This guide will walk you through setting up and running the **Agentic AI App** – a full-stack call transcription and analysis tool.

---

## ⚙️ Prerequisites

- Docker and Docker Compose installed
- OpenAI API Key (for GPT-based scoring)
- (Optional) Whisper CLI if running transcription outside Docker

---

## 🚀 Quick Start with Docker

### 1. Clone the Repository

```bash
git clone https://github.com/smk34/agentic-ai-app.git
cd agentic-ai-app
```

### 2. Create a `.env` File

At the root of the project, create a `.env` file and add your OpenAI key:

```env
OPENAI_API_KEY=your-openai-api-key-here
```

> 🔐 This is used by the backend to connect to OpenAI's GPT API for analysis.

### 3. Run the App

```bash
docker-compose up --build
```

This will build and launch 3 containers:
- MongoDB
- Node.js backend (port `8000`)
- React frontend (port `5173`)

---

## 🌐 Access the App

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:8000](http://localhost:8000)

---

## 🧪 Test the Workflow

1. Navigate to `http://localhost:5173`
2. Login with mock credentials:
   ```
   Username: demo
   Password: password123
   ```
3. Upload an audio file (MP3, WAV, etc.)
4. Wait for transcription + GPT-based analysis
5. View transcript, scores, and coaching plan on dashboard

---

## 🧼 Stop and Clean Up

```bash
docker-compose down
```

To remove volumes too (clears DB data):

```bash
docker-compose down -v
```

---

## ✅ You're all set!



## 🔌 Integration Points (STT / LLM)

This app integrates with two key AI services for call intelligence:

### 🗣️ 1. **Speech-to-Text (STT)** – Whisper CLI

- **Technology**: [OpenAI Whisper CLI](https://github.com/openai/whisper)
- **Usage**:
  - Converts uploaded audio files (MP3, WAV, M4A) into plain text transcripts.
  - Triggered by backend at `/api/upload` using `child_process.exec` to run Whisper locally inside the container.
- **Model Used**: `medium` or `small` (you can modify via the CLI command in `transcriptionService.js`)

> 📌 Whisper CLI must be available in the Docker environment (it is used via a mounted volume, or can be baked into the image).

---

### 🧠 2. **Language Model (LLM)** – OpenAI GPT-4o-mini

- **Technology**: [OpenAI GPT APIs](https://platform.openai.com/)
- **Usage**:
  - Takes the raw transcript as input and scores the call across 6 quality dimensions:
    - Call Opening
    - Issue Capture
    - Agent Sentiment
    - Customer Sentiment
    - CSAT/FCR (inferred)
    - Resolution Quality
  - Also returns a short coaching summary.

