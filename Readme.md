# Location Marking Dashboard

A full-stack web application where users can log in, mark their favorite locations on a map, and add descriptions. Features user authentication via Keycloak and personalized location dashboards.

## 🚀 Quick Setup (For Interviewers)

### Prerequisites

- Docker and Docker Compose installed
- Ports 5173, 4000, 8080, 5432 available

### Run the Application

```bash
git clone git@github.com:Gokuldev23/iudx-assessment.git
cd location-marking-dashboard
docker compose up -d
```

**Wait 2-3 minutes** for all services to initialize, then access:

- **Application**: <http://localhost:5173>
- **Keycloak Admin**: <http://localhost:8080/> (admin: `gokulvenkat.dev@gmail.com` / `Lg@2024`)

## 🎯 How to Test

1. Visit <http://localhost:5173>
2. Click "Login" → authenticate with Keycloak
3. Click on map to drop markers
4. Add descriptions to markers
5. Logout and login again to see persisted markers

## 🏗️ Architecture

- **Frontend**: React/Vite (Port 5173)
- **Backend**: Express.js REST API (Port 4000)
- **Database**: PostgreSQL (Port 5432)
- **Auth**: Keycloak (Port 8080)
- **Containerization**: Docker Compose

## 📁 Project Structure

```
├── docker-compose.yml          # Multi-service orchestration
├── realm-export.json          # Pre-configured Keycloak realm
├── frontend/                   # React application
│   ├── dist/                   # Build output
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── hooks/              # Custom React hooks
│   │   └── services/           # API service calls
│   ├── App.jsx                 # Main App component
│   └── Dockerfile
├── backend/                    # Express.js API
│   ├── config/                 # Database & auth config
│   ├── controllers/            # Route handlers
│   ├── middleware/             # Auth & validation middleware
│   ├── routes/                 # API routes
│   ├── server.js               # Express server entry point
│   └── Dockerfile
└── README.md
```

## ✅ Features Implemented

- ✅ User authentication (Keycloak OAuth2/OIDC)
- ✅ Interactive map with marker placement
- ✅ Marker descriptions and persistence
- ✅ User-specific marker isolation
- ✅ RESTful API backend
- ✅ PostgreSQL database integration
- ✅ Fully containerized deployment
- ✅ Pre-configured authentication realm

## 🔧 Key Configuration

### Docker Services

- **keycloak**: Authentication server with imported realm
- **postgres**: Database with persistent storage
- **backend**: Express API with Keycloak integration
- **frontend**: React app with map functionality

### Environment Variables (Pre-configured)

```yaml
# Backend connects to:
- DATABASE_URL: postgres://gokul:Lg%402024@postgres:5432/iudx
- KEYCLOAK_URL: http://localhost:8080
- KEYCLOAK_REALM: my-app

# Frontend connects to:
- VITE_API_BASE_URL: http://localhost:4000
- VITE_KEYCLOAK_URL: http://localhost:8080
```

## 🔍 Troubleshooting

### If services don't start

```bash
# Check status
docker compose ps

# View logs
docker compose logs -f

# Restart specific service
docker compose restart [service-name]
```

### If ports are occupied

```bash
# Check port usage
lsof -i :8080
lsof -i :5173

# Stop and restart
docker compose down
docker compose up -d
```

### Reset everything

```bash
docker compose down -v  # Removes data volumes
docker compose up --build -d
```

## 🎯 Testing Endpoints

Once running, test these endpoints:

- `GET http://localhost:4000/health` - Backend health check
- `GET http://localhost:4000/api/markers` - Get user markers (requires auth)
- `POST http://localhost:4000/api/markers` - Create marker (requires auth)

## 📝 Assignment Compliance

✅ **Frontend**: React app with map integration  
✅ **Map Libraries**: React-leaflet Interactive marker placement  
✅ **User Login**: Keycloak authentication  
✅ **Marker Title-Descriptions**: Text input for each location  
✅ **Persistent Storage**: PostgreSQL database  
✅ **User Isolation**: Personalized marker views  
✅ **Keycloak Integration**: OAuth2/OIDC implementation  
✅ **Backend API**: RESTful endpoints  
✅ **Database Support**: PostgreSQL with Docker  
✅ **Containerization**: Complete Docker setup

---

**Total Setup Time**: ~3 minutes | **No manual configuration required**
