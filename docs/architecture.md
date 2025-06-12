# Application Architecture

This diagram represents the architecture of the my-server application, showing the relationships between frontend components, backend services, and the Docker container.

```mermaid
flowchart TD
    subgraph Frontend["Frontend (public/)"]
        UI["index.html"]
        JS["app.js"]
        LS["LocalStorage"]
        
        subgraph UI_Components["UI Components"]
            Login["Login Form"]
            Stories["Stories Section"]
            AddStory["Add Story Form"]
        end
        
        JS --> UI_Components
        JS <--> LS
    end

    subgraph Backend["Backend (index.js)"]
        Express["Express Server"]
        
        subgraph Middleware["Middleware"]
            JsonParser["express.json()"]
            Static["express.static()"]
        end
        
        subgraph Storage["In-Memory Storage"]
            Users["Users Array"]
            StoriesDB["Stories Array"]
        end
        
        subgraph Endpoints["API Endpoints"]
            LoginAPI["/api/login"]
            GetStories["/api/stories GET"]
            PostStory["/api/stories POST"]
        end
        
        Express --> Middleware
        Endpoints --> Storage
    end

    subgraph Docker["Docker Container"]
        Node["Node.js Runtime"]
        Port["Port 3000"]
    end

    Login --"POST /api/login"--> LoginAPI
    LoginAPI --"Validate"--> Users
    Stories --"GET /api/stories"--> GetStories
    GetStories --"Fetch"--> StoriesDB
    AddStory --"POST /api/stories"--> PostStory
    PostStory --"Save"--> StoriesDB
```

## Components Description

### Frontend
- **UI Components**: HTML-based user interface with login form, stories section, and story creation form
- **JavaScript Logic**: Handles user interactions, API calls, and local storage management
- **LocalStorage**: Manages user session data

### Backend
- **Express Server**: Node.js server handling HTTP requests
- **Middleware**: Processes JSON requests and serves static files
- **Storage**: In-memory arrays for users and stories
- **API Endpoints**: RESTful endpoints for authentication and story management

### Docker
- **Container**: Isolates the application environment
- **Port Mapping**: Exposes port 3000 for web access

## API Endpoints
1. `POST /api/login` - User authentication
2. `GET /api/stories` - Retrieve all stories
3. `POST /api/stories` - Create a new story 